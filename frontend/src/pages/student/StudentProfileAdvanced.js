import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const StudentProfileAdvanced = ({ userId }) => {
  const [profile, setProfile] = useState({ name: '', email: '', bio: '', skills: [], interests: [], sfiaSkills: [], badges: [], profilePicture: '', socialLinks: {} });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get(`/api/users/${userId}/profile`);
      setProfile(res.data);

      const sfiaRes = await api.get(`/api/sfia/user/${userId}`);
      setProfile(prev => ({ ...prev, sfiaSkills: sfiaRes.data.skills }));

      const badgesRes = await api.get(`/api/badges/user/${userId}`);
      setProfile(prev => ({ ...prev, badges: badgesRes.data }));
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [name]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/api/users/${userId}/profile`, profile);
    alert('Profile updated successfully!');
  };

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);
    const res = await api.post(`/api/users/${userId}/profile/picture`, formData);
    setProfile(prev => ({ ...prev, profilePicture: res.data.url }));
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">My Advanced Profile</h1>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-2">
            <label className="block mb-1">Profile Picture:</label>
            <input type="file" onChange={handlePictureUpload} />
            {profile.profilePicture && <img src={profile.profilePicture} alt="Profile" className="w-20 h-20 mt-2 rounded-full" />}
          </div>
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
          <div className="mb-2">
            <h2 className="font-semibold mb-1">SFIA Skills</h2>
            <ul>{profile.sfiaSkills.map((s, idx) => <li key={idx}>{s}</li>)}</ul>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold mb-1">Badges Earned</h2>
            <ul>{profile.badges.map(b => <li key={b._id}><a href={b.criteriaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{b.title}</a></li>)}</ul>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold mb-1">Social Links</h2>
            <input type="text" name="linkedin" placeholder="LinkedIn URL" value={profile.socialLinks.linkedin || ''} onChange={handleSocialChange} className="border p-1 w-full mb-1" />
            <input type="text" name="twitter" placeholder="Twitter URL" value={profile.socialLinks.twitter || ''} onChange={handleSocialChange} className="border p-1 w-full mb-1" />
            <input type="text" name="github" placeholder="GitHub URL" value={profile.socialLinks.github || ''} onChange={handleSocialChange} className="border p-1 w-full mb-1" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded mt-2">Save Profile</button>
        </form>
      </main>
    </div>
  );
};

export default StudentProfileAdvanced;