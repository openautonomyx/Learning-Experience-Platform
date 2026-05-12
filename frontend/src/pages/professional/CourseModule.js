import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const CourseModule = ({ courseId, userId }) => {
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      const courseRes = await api.get(`/api/courses/${courseId}`);
      setCourse(courseRes.data);

      const lessonsRes = await api.get(`/api/lessons/${courseId}`);
      setLessons(lessonsRes.data);

      const assignmentsRes = await api.get(`/api/assignments/${courseId}/user/${userId}`);
      setAssignments(assignmentsRes.data);

      const badgesRes = await api.get(`/api/badges/user/${userId}`);
      setBadges(badgesRes.data.filter(b => b.title === courseRes.data.title));
    };

    fetchCourseData();
  }, [courseId, userId]);

  if (!course) return <p>Loading course...</p>;

  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-200 p-4 h-screen">
          <h2 className="font-bold mb-4">Course Menu</h2>
          <ul>
            <li className="mb-2">Lessons</li>
            <li className="mb-2">Assignments</li>
            <li className="mb-2">Badges</li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <section className="mb-6">
            <h2 className="font-semibold mb-2">Lessons</h2>
            <ul>
              {lessons.map(lesson => (
                <li key={lesson._id} className="mb-1 cursor-pointer hover:underline">{lesson.title}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="font-semibold mb-2">Assignments</h2>
            {assignments.map(assignment => (
              <div key={assignment._id} className="card mb-2">
                <p>{assignment.title}</p>
                <p>Status: {assignment.status}</p>
                <p>Due: {assignment.dueDate}</p>
                <button className="mt-1 bg-blue-600 text-white px-2 py-1 rounded">Submit</button>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-semibold mb-2">Earned Badges</h2>
            {badges.length ? badges.map(b => (
              <a key={b._id} href={b.criteriaUrl} target="_blank" rel="noopener noreferrer" className="inline-block mr-2 mb-1 p-1 bg-blue-600 text-white rounded">{b.title}</a>
            )) : <p>No badges earned yet.</p>}
          </section>
        </main>
      </div>
    </div>
  );
};

export default CourseModule;