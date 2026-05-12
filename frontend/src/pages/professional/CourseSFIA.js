import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';
import api from '../../utils/api';

const CourseSFIA = ({ courseId }) => {
  const [skills, setSkills] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const sfiaRes = await api.get(`/api/sfia/${courseId}`);
      setSkills(sfiaRes.data.skills);

      const jobsRes = await api.get(`/api/jobs/${courseId}`);
      setJobPositions(jobsRes.data.jobPositions);
    };
    fetchSkills();
  }, [courseId]);

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Course SFIA Skills & Jobs</h1>
        <div className="card mb-4">
          <h2 className="font-semibold">SFIA Skills</h2>
          <ul>
            {skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold">Applicable Job Positions</h2>
          <ul>
            {jobPositions.map((job, idx) => <li key={idx}>{job}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CourseSFIA;