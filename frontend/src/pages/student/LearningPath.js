import React from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';

const learningPathCourses = [
  { id: 1, title: 'Mathematics 101', status: 'Completed' },
  { id: 2, title: 'Physics 101', status: 'In Progress' },
  { id: 3, title: 'Computer Science 101', status: 'Not Started' },
];

const LearningPath = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-200 p-4 h-screen">
          <h2 className="font-bold mb-4">Student Menu</h2>
          <ul>
            <li className="mb-2"><a href="/student/Dashboard">Dashboard</a></li>
            <li className="mb-2"><a href="#">Grades</a></li>
            <li className="mb-2"><a href="#">Profile</a></li>
            <li className="mb-2"><a href="/student/LearningPath">Learning Path</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Learning Path</h1>
          {learningPathCourses.map(course => (
            <div key={course.id} className="card">
              <h3 className="font-semibold">{course.title}</h3>
              <p>Status: {course.status}</p>
              <div className="w-full bg-gray-300 h-2 rounded mt-2">
                <div className={`h-2 rounded ${course.status === 'Completed' ? 'bg-green-600' : course.status === 'In Progress' ? 'bg-yellow-600' : 'bg-gray-500'}`} style={{width: course.status === 'Completed' ? '100%' : course.status === 'In Progress' ? '50%' : '0%'}}></div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default LearningPath;