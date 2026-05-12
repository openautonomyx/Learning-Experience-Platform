import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const ProgressiveLesson = ({ courseId, userId }) => {
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const lessonsRes = await api.get(`/api/lessons/${courseId}`);
      setLessons(lessonsRes.data);

      const completedRes = await api.get(`/api/lessons/completed/${courseId}/user/${userId}`);
      setCompletedLessons(completedRes.data.map(l => l._id));
    };
    fetchLessons();
  }, [courseId, userId]);

  const handleComplete = async (lessonId) => {
    await api.post(`/api/lessons/${lessonId}/complete`, { userId });
    setCompletedLessons([...completedLessons, lessonId]);
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Progressive Lessons</h1>
        <ul>
          {lessons.map(lesson => (
            <li key={lesson._id} className="mb-2 card p-2 flex justify-between items-center">
              <span>{lesson.title}</span>
              {completedLessons.includes(lesson._id) ? (
                <span className="text-green-600 font-semibold">Completed</span>
              ) : (
                <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleComplete(lesson._id)}>Mark Complete</button>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p>Progress: {Math.round((completedLessons.length / lessons.length) * 100) || 0}%</p>
          <div className="w-full bg-gray-300 h-2 rounded mt-1">
            <div className="bg-green-600 h-2 rounded" style={{width: `${(completedLessons.length / lessons.length) * 100 || 0}%`}}></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressiveLesson;