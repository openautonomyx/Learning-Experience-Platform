import React from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';

const professionalAssignments = [
  { id: 1, course: 'Liferay Fundamentals', title: 'Build a Liferay Portal', dueDate: '2026-05-20', status: 'Pending' },
  { id: 2, course: 'LangChain for AI Applications', title: 'Create a QA Bot', dueDate: '2026-05-25', status: 'In Progress' },
  { id: 3, course: 'Project Management', title: 'Project Plan Document', dueDate: '2026-05-30', status: 'Completed' },
];

const CourseAssignments = () => {
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
            <li className="mb-2"><a href="/professional/CourseAssignments">Assignments</a></li>
            <li className="mb-2"><a href="#">Profile</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Course Assignments</h1>
          {professionalAssignments.map(assignment => (
            <div key={assignment.id} className="card">
              <h3 className="font-semibold">{assignment.course}</h3>
              <p>Assignment: {assignment.title}</p>
              <p>Due Date: {assignment.dueDate}</p>
              <p>Status: {assignment.status}</p>
              <button className="mt-2">Submit</button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default CourseAssignments;