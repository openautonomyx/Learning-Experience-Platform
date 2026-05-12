import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const DynamicUserRoleManagement = ({ orgId }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['student','teacher','admin','hr','recruiter','recruitment_agency']);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get(`/api/organizations/${orgId}/users`);
      setUsers(res.data);
    };

    fetchUsers();
  }, [orgId]);

  const handleRoleChange = async (userId, newRole) => {
    await api.patch(`/api/users/${userId}/role`, { role: newRole });
    setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    alert('Role updated successfully');
  };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dynamic User and Role Management</h1>
        <ul>
          {users.map(u => (
            <li key={u._id} className="mb-2 card p-2 flex justify-between items-center">
              <span>{u.name} ({u.role})</span>
              <select value={u.role} onChange={e => handleRoleChange(u._id, e.target.value)} className="border p-1">
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default DynamicUserRoleManagement;