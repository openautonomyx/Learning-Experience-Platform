import React from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';

const professionalCourses = [
  { id: 1, title: 'Liferay Fundamentals', description: 'Learn to build enterprise portals with Liferay.' },
  { id: 2, title: 'LangChain for AI Applications', description: 'Master LangChain for building AI-powered applications.' },
  { id: 3, title: 'Project Management', description: 'Essential project management skills for professionals.' },
];

const Courses = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-200 p-4 h-screen">
          <h2 className="font-bold mb-4">Professional Menu</h2>
          <ul>
            <li className="mb-2"><a href="/professional/Dashboard">Dashboard</a></li>
            <li className="mb-2"><a href="/professional/LearningPathTimeline">Learning Path</a></li>
            <li className="mb-2"><a href="/professional/Courses">Courses</a></li>
            <li className="mb-2"><a href="#">Profile</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
          {professionalCourses.map(course => (
            <div key={course.id} className="card">
              <h3 className="font-semibold">{course.title}</h3>
              <p>{course.description}</p>
              <button className="mt-2">Enroll</button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Courses;