import React from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';

const studentCourses = [
  { id: 1, title: 'Mathematics 101', progress: 70 },
  { id: 2, title: 'Physics 101', progress: 45 },
  { id: 3, title: 'Computer Science 101', progress: 90 },
];

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-200 p-4 h-screen">
          <h2 className="font-bold mb-4">Student Menu</h2>
          <ul>
            <li className="mb-2"><a href="#">My Courses</a></li>
            <li className="mb-2"><a href="#">Grades</a></li>
            <li className="mb-2"><a href="#">Profile</a></li>
            <li className="mb-2"><a href="#">Internships</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          {studentCourses.map(course => (
            <div key={course.id} className="card">
              <h3 className="font-semibold">{course.title}</h3>
              <p>Progress: {course.progress}%</p>
              <div className="w-full bg-gray-300 h-2 rounded mt-2">
                <div className="bg-blue-800 h-2 rounded" style={{width: `${course.progress}%`}}></div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;