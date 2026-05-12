import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const OrganizationDashboard = ({ orgId }) => {
  const [org, setOrg] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchOrgData = async () => {
      const orgRes = await api.get(`/api/organizations/${orgId}`);
      setOrg(orgRes.data);

      const usersRes = await api.get(`/api/organizations/${orgId}/users`);
      setUsers(usersRes.data);
    };

    fetchOrgData();
  }, [orgId]);

  if (!org) return <p>Loading organization data...</p>;

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Organization Dashboard: {org.name}</h1>
        <h2 className="font-semibold mb-2">Admin: {org.admin.name}</h2>
        <section>
          <h2 className="font-semibold mb-2">Users in Organization</h2>
          <ul>
            {users.map(u => (
              <li key={u._id} className="mb-1 card p-2">{u.name} ({u.role})</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default OrganizationDashboard;