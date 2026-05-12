import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const LiveOnlineSocial = ({ userId }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sessionRequests, setSessionRequests] = useState([]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      const res = await api.get(`/api/users/online`);
      setOnlineUsers(res.data.filter(u => u._id !== userId));
    };

    fetchOnlineUsers();
    const interval = setInterval(fetchOnlineUsers, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [userId]);

  const requestSession = async (teacherId) => {
    const res = await api.post(`/api/doubts/request-session`, { studentId: userId, teacherId });
    setSessionRequests([...sessionRequests, res.data]);
    alert('Session request sent. Waiting for teacher approval.');
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Live Social Session</h1>
        <p>Connect with online teachers/students available for live doubt clearing or collaborative sessions.</p>
        <h2 className="font-semibold mt-4 mb-2">Online Users</h2>
        <ul>
          {onlineUsers.map(user => (
            <li key={user._id} className="mb-2 card p-2 flex justify-between items-center">
              <span>{user.name} ({user.role})</span>
              <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => requestSession(user._id)}>Request Session</button>
            </li>
          ))}
        </ul>
        <h2 className="font-semibold mt-4 mb-2">Pending Session Requests</h2>
        <ul>
          {sessionRequests.map(req => (
            <li key={req._id} className="mb-1 card p-1">User: {req.teacherName || req.studentName}, Status: {req.status}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default LiveOnlineSocial;