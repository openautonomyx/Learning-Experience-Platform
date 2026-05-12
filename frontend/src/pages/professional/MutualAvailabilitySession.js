import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const MutualAvailabilitySession = ({ userId, courseId }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [preferredTime, setPreferredTime] = useState('');
  const [sessionRequests, setSessionRequests] = useState([]);

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      const res = await api.get(`/api/users/available?courseId=${courseId}&excludeUser=${userId}`);
      setAvailableUsers(res.data);
    };
    fetchAvailableUsers();
    const interval = setInterval(fetchAvailableUsers, 30000); // refresh online users every 30s
    return () => clearInterval(interval);
  }, [courseId, userId]);

  const requestSession = async (otherUserId) => {
    if(!preferredTime) return alert('Please select your preferred time');
    const res = await api.post(`/api/sessions/request`, { userId, otherUserId, courseId, preferredTime });
    setSessionRequests([...sessionRequests, res.data]);
    alert('Session request sent, waiting for mutual acceptance');
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Mutual Availability Live Session</h1>
        <div className="mb-4">
          <label className="block mb-2">Preferred Time:</label>
          <input type="datetime-local" value={preferredTime} onChange={e => setPreferredTime(e.target.value)} className="border p-1" />
        </div>
        <h2 className="font-semibold mb-2">Available Users</h2>
        <ul>
          {availableUsers.map(u => (
            <li key={u._id} className="mb-2 card p-2 flex justify-between items-center">
              <span>{u.name} ({u.role})</span>
              <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => requestSession(u._id)}>Request Session</button>
            </li>
          ))}
        </ul>
        <h2 className="font-semibold mt-4 mb-2">Pending Requests</h2>
        <ul>
          {sessionRequests.map(req => (
            <li key={req._id} className="mb-1 card p-1">User: {req.otherUserName}, Time: {req.preferredTime}, Status: {req.status}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default MutualAvailabilitySession;