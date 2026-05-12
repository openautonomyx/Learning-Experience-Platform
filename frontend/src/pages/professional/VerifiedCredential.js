import React from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';

const verifiedCredentials = [
  { id: 1, course: 'Liferay Fundamentals', credentialId: 'VC-LF-001', status: 'Issued', dateIssued: '2026-05-10' },
  { id: 2, course: 'LangChain for AI Applications', credentialId: 'VC-LC-002', status: 'Issued', dateIssued: '2026-05-12' },
  { id: 3, course: 'Project Management', credentialId: 'VC-PM-003', status: 'Pending', dateIssued: '' },
];

const VerifiedCredential = () => {
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
            <li className="mb-2"><a href="/professional/VerifiedCredential">Verified Credentials</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Verified Credentials</h1>
          {verifiedCredentials.map(vc => (
            <div key={vc.id} className="card">
              <h3 className="font-semibold">{vc.course}</h3>
              <p>Credential ID: {vc.credentialId}</p>
              <p>Status: {vc.status}</p>
              {vc.dateIssued && <p>Date Issued: {vc.dateIssued}</p>}
              {vc.status === 'Issued' && <button className="mt-2">Download Credential</button>}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default VerifiedCredential;