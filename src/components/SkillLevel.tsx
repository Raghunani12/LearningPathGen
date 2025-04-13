import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { GraduationCap, Book, Trophy } from 'lucide-react';
import type { SkillLevel as SkillLevelType } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ Initialize Generative AI with v1beta-compatible model
const genAI = new GoogleGenerativeAI('AIzaSyD85tV_rAv2oGnpUKiBsed0KG3tYKlIWjc'); // Replace with actual key

// Question interface
interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Skill levels list
const skillLevels = [
  {
    level: 'beginner',
    title: 'Beginner',
    description: 'New to the subject, learning fundamentals',
    icon: Book,
    color: 'bg-green-50 text-green-600',
  },
  {
    level: 'intermediate',
    title: 'Intermediate',
    description: 'Familiar with basics, ready for advanced concepts',
    icon: GraduationCap,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    level: 'advanced',
    title: 'Advanced',
    description: 'Experienced, seeking mastery',
    icon: Trophy,
    color: 'bg-purple-50 text-purple-600',
  },
];

export const SkillLevel: React.FC = () => {
  const { setSkillLevel, nextStep, setQuestions, selectedTopic } = useStore();
  const [status, setStatus] = useState<boolean>(false);

  const handleSkillSelect = async (level: SkillLevelType) => {
    setSkillLevel(level);
    setStatus(true);

    try {
      const topicName = selectedTopic?.name ?? 'Cybersecurity';
      const prompt = `
        Generate a quiz of 5 questions for the topic "${topicName}" suitable for a "${level}" learner.
        Format as pure JSON array with fields: id, text, options, correctAnswer.
        Example:
        [
          {
            "id": "1",
            "text": "What is the purpose of a firewall?",
            "options": ["Block viruses", "Block unauthorized access", "Speed up internet", "Encrypt data"],
            "correctAnswer": "Block unauthorized access"
          },
          ...
        ]
      `;

      //const model = genAI.getGenerativeModel({ model: 'gemini-pro' }); // Can use gemini-1.5-flash if preferred
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // ✅ This one works with v1beta

      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // ✅ Clean response: remove ```json and ``` markers
      const jsonStart = response.indexOf('[');
      const jsonEnd = response.lastIndexOf(']') + 1;
      const cleaned = response.substring(jsonStart, jsonEnd);

      const parsed: Question[] = JSON.parse(cleaned).map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options,
        correctAnswer: q.options.indexOf(q.correctAnswer), // Get index instead of value
      }));

      if (!parsed || parsed.length === 0) {
        throw new Error('No questions found in parsed response.');
      }

      setQuestions(parsed);
      nextStep();
    } catch (error) {
      console.error('❌ Error generating questions:', error);
      alert('Something went wrong. Please try again.');
    }

    setStatus(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        What's Your Current Skill Level?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillLevels.map(({ level, title, description, icon: Icon, color }) => (
          <button
            key={level}
            onClick={() => handleSkillSelect(level as SkillLevelType)}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center space-y-4 border border-gray-100 hover:border-blue-500"
          >
            <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center`}>
              <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-center">{description}</p>
          </button>
        ))}
      </div>
      {status && (
        <h1 className="text-lg mt-6 text-center text-blue-600 animate-pulse font-semibold">
          Generating quiz... please wait ⏳
        </h1>
      )}
    </div>
  );
};
