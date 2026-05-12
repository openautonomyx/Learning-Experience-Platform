import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const LessonContent = ({ lessonId }) => {
  const [lesson, setLesson] = useState(null);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchLesson = async () => {
      const res = await api.get(`/api/lessons/${lessonId}`);
      setLesson(res.data);

      const resourcesRes = await api.get(`/api/lessons/${lessonId}/resources`);
      setResources(resourcesRes.data);
    };

    fetchLesson();
  }, [lessonId]);

  if (!lesson) return <p>Loading lesson content...</p>;

  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-200 p-4 h-screen">
          <h2 className="font-bold mb-4">Lesson Menu</h2>
          <ul>
            <li className="mb-2">Lesson Overview</li>
            <li className="mb-2">Resources</li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
          <p className="mb-4">{lesson.description}</p>

          <section>
            <h2 className="font-semibold mb-2">Resources</h2>
            <ul>
              {resources.map(res => (
                <li key={res._id} className="mb-1">
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{res.title}</a>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LessonContent;