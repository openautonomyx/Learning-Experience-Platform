import React, { useState } from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';

const CourseModuleSkeleton = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: 'Introduction', keyPoints: ['Overview of the course', 'Objectives', 'Learning outcomes'] },
    { id: 2, title: 'Core Concepts', keyPoints: ['Definition', 'Importance', 'Examples'] },
    { id: 3, title: 'Advanced Techniques', keyPoints: ['Best practices', 'Case studies', 'Implementation tips'] }
  ]);

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Course Module (Skeleton)</h1>
        {topics.map(topic => (
          <div key={topic.id} className="card mb-4">
            <h2 className="font-semibold mb-2">{topic.title}</h2>
            <ul className="list-disc list-inside">
              {topic.keyPoints.map((kp, idx) => <li key={idx}>{kp}</li>)}
            </ul>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CourseModuleSkeleton;