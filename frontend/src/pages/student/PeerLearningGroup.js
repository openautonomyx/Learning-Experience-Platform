import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const PeerLearningGroup = ({ userId, courseId }) => {
  const [onlineStudents, setOnlineStudents] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const [preferredTime, setPreferredTime] = useState('');

  useEffect(() => {
    const fetchOnlineStudents = async () => {
      const res = await api.get(`/api/users/online?role=student&courseId=${courseId}&excludeUser=${userId}`);
      setOnlineStudents(res.data);
    };

    fetchOnlineStudents();
    const interval = setInterval(fetchOnlineStudents, 30000);
    return () => clearInterval(interval);
  }, [userId, courseId]);

  const requestGroup = async (otherStudentId) => {
    if (!preferredTime) return alert('Select your preferred time.');
    const res = await api.post(`/api/peer-learning/request`, {
      requesterId: userId,
      partnerId: otherStudentId,
      courseId,
      preferredTime
    });
    setGroupRequests([...groupRequests, res.data]);
    alert('Group request sent. Waiting for mutual acceptance.');
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Peer Learning Groups</h1>
        <div className="mb-4">
          <label className="block mb-2">Preferred Time:</label>
          <input type="datetime-local" value={preferredTime} onChange={e => setPreferredTime(e.target.value)} className="border p-1" />
        </div>
        <h2 className="font-semibold mb-2">Available Students</h2>
        <ul>
          {onlineStudents.map(s => (
            <li key={s._id} className="mb-2 card p-2 flex justify-between items-center">
              <span>{s.name}</span>
              <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => requestGroup(s._id)}>Request Peer Group</button>
            </li>
          ))}
        </ul>
        <h2 className="font-semibold mt-4 mb-2">Pending Group Requests</h2>
        <ul>
          {groupRequests.map(req => (
            <li key={req._id} className="mb-1 card p-1">Student: {req.partnerName}, Time: {req.preferredTime}, Status: {req.status}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default PeerLearningGroup;