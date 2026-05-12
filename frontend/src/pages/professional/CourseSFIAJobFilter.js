import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import '../../styles/moodle.css';
import api from '../../utils/api';

const CourseSFIAJobFilter = ({ courseId }) => {
  const [skills, setSkills] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [filterJob, setFilterJob] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const sfiaRes = await api.get(`/api/sfia/${courseId}`);
      setSkills(sfiaRes.data.skills);

      const jobsRes = await api.get(`/api/jobs/${courseId}`);
      setJobPositions(jobsRes.data.jobPositions);
    };
    fetchData();
  }, [courseId]);

  const filteredJobs = filterJob ? jobPositions.filter(j => j.toLowerCase().includes(filterJob.toLowerCase())) : jobPositions;

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Course SFIA Skills & Job Positions</h1>

        <div className="card mb-4">
          <h2 className="font-semibold">SFIA Skills</h2>
          <ul>
            {skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
          </ul>
        </div>

        <div className="card">
          <h2 className="font-semibold">Applicable Job Positions</h2>
          <input type="text" placeholder="Filter job positions" className="mb-2 p-1 border" value={filterJob} onChange={e => setFilterJob(e.target.value)} />
          <ul>
            {filteredJobs.map((job, idx) => <li key={idx}>{job}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default CourseSFIAJobFilter;