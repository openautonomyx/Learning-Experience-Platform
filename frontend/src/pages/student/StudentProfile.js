import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const StudentProfile = ({ userId }) => {
  const [profile, setProfile] = useState({ name: '', email: '', bio: '', skills: [], interests: [] });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get(`/api/users/${userId}/profile`);
      setProfile(res.data);
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/users/${userId}/profile`, profile);
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-2">
            <label className="block mb-1">Name:</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="border p-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Email:</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} className="border p-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Bio:</label>
            <textarea name="bio" value={profile.bio} onChange={handleChange} className="border p-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Skills (comma separated):</label>
            <input type="text" name="skills" value={profile.skills.join(', ')} onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()) })} className="border p-1 w-full" />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Interests (comma separated):</label>
            <input type="text" name="interests" value={profile.interests.join(', ')} onChange={(e) => setProfile({ ...profile, interests: e.target.value.split(',').map(s => s.trim()) })} className="border p-1 w-full" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded mt-2">Save Profile</button>
        </form>
      </main>
    </div>
  );
};

export default StudentProfile;