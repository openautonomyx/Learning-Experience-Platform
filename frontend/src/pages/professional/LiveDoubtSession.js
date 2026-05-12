import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const LiveDoubtSession = ({ userId, courseId }) => {
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [studentPreferredTime, setStudentPreferredTime] = useState('');
  const [sessionRequests, setSessionRequests] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await api.get(`/api/users/available-teachers?courseId=${courseId}&userId=${userId}`);
      setAvailableTeachers(res.data);
    };
    fetchTeachers();
  }, [courseId, userId]);

  const requestSession = async (teacherId) => {
    if(!studentPreferredTime) return alert('Please select your preferred time.');
    const res = await api.post(`/api/doubts/request-session`, { teacherId, userId, courseId, preferredTime: studentPreferredTime });
    setSessionRequests([...sessionRequests, res.data]);
    alert('Session request sent. Waiting for teacher approval.');
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Live Doubt Clearing Session</h1>
        <div className="mb-4">
          <label className="block mb-2">Preferred Time:</label>
          <input type="datetime-local" value={studentPreferredTime} onChange={e => setStudentPreferredTime(e.target.value)} className="border p-1" />
        </div>
        <h2 className="font-semibold mb-2">Available Teachers</h2>
        <ul>
          {availableTeachers.map(teacher => (
            <li key={teacher._id} className="mb-2 card p-2 flex justify-between items-center">
              <span>{teacher.name}</span>
              <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => requestSession(teacher._id)}>Request Session</button>
            </li>
          ))}
        </ul>
        <h2 className="font-semibold mt-4 mb-2">Pending Session Requests</h2>
        <ul>
          {sessionRequests.map(req => (
            <li key={req._id} className="mb-1 card p-1">Teacher: {req.teacherName}, Time: {req.preferredTime}, Status: {req.status}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default LiveDoubtSession;