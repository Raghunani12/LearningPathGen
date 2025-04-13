// import React from 'react';
// import { SearchBar } from './SearchBar';
// import { Sparkles } from 'lucide-react';

// export const TopicSelection = () => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-4 text-gray-800">
//           What Do You Want to Learn Today?
//         </h1>
//         <p className="text-lg text-gray-600 mb-8">
//           Search from over 1000+ courses and start your learning journey
//         </p>
//         <SearchBar />
//       </div>

//       <div className="mt-16">
//         <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center justify-center">
//           <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
//           Popular Topics
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {popularTopics.map((topic) => (
//             <div
//               key={topic}
//               className="px-4 py-2 bg-gray-50 rounded-lg text-center text-gray-700 text-sm hover:bg-gray-100 transition-colors duration-200"
//             >
//               {topic}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const popularTopics = [
//   'React.js',
//   'Python',
//   'Machine Learning',
//   'JavaScript',
//   'Data Science',
//   'Web Development',
//   'UI/UX Design',
//   'Node.js',
//   'AWS',
//   'DevOps',
//   'Cybersecurity',
//   'Flutter'
// ];

//UPDATED CODE
import React from 'react';
import { SearchBar } from './SearchBar';
import { Sparkles } from 'lucide-react';

export const TopicSelection = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
          What Do You Want to Learn Today?
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-10">
          Search from over 1000+ courses and start your learning journey.
        </p>
        <div className="w-full max-w-2xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Popular Topics */}
      <div className="mt-16">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center justify-center">
          <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
          Popular Topics
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
          {popularTopics.map((topic) => (
            <div
              key={topic}
              className="text-center px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 cursor-pointer"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const popularTopics = [
  'React.js',
  'Python',
  'Machine Learning',
  'JavaScript',
  'Data Science',
  'Web Development',
  'UI/UX Design',
  'Node.js',
  'AWS',
  'DevOps',
  'Cybersecurity',
  'Flutter',
];
