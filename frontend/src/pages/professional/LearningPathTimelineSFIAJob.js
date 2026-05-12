import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const LearningPathTimelineSFIAJob = ({ userId }) => {
  const [learningTimeline, setLearningTimeline] = useState([]);
  const [jobFilter, setJobFilter] = useState('');

  useEffect(() => {
    const fetchTimeline = async () => {
      const coursesRes = await api.get(`/api/professional/${userId}/learning-path`);
      const courses = coursesRes.data;

      const enrichedCourses = await Promise.all(courses.map(async (course) => {
        const sfiaRes = await api.get(`/api/sfia/${course.id}`);
        const jobsRes = await api.get(`/api/jobs/${course.id}`);
        const badgesRes = await api.get(`/api/badges/user/${userId}`);

        const badgesForCourse = badgesRes.data.filter(b => b.title === course.title);

        return {
          ...course,
          sfiaSkills: sfiaRes.data.skills,
          jobPositions: jobsRes.data.jobPositions,
          badges: badgesForCourse
        };
      }));

      setLearningTimeline(enrichedCourses);
    };

    fetchTimeline();
  }, [userId]);

  const filteredTimeline = jobFilter ? learningTimeline.filter(course =>
    course.jobPositions.some(job => job.toLowerCase().includes(jobFilter.toLowerCase()))
  ) : learningTimeline;

  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-200 p-4 h-screen">
          <h2 className="font-bold mb-4">Professional Menu</h2>
          <ul>
            <li className="mb-2"><a href="/professional/Dashboard">Dashboard</a></li>
            <li className="mb-2"><a href="/professional/LearningPathTimelineSFIAJob">Learning Path</a></li>
            <li className="mb-2"><a href="/professional/Courses">Courses</a></li>
            <li className="mb-2"><a href="/professional/CourseAssignments">Assignments</a></li>
            <li className="mb-2"><a href="/professional/VerifiedCredential">Verified Credentials</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Learning Path Timeline</h1>
          <input type="text" placeholder="Filter by job position" className="mb-4 p-1 border" value={jobFilter} onChange={e => setJobFilter(e.target.value)} />
          {filteredTimeline.map(course => (
            <div key={course.id} className="card mb-4">
              <h3 className="font-semibold">{course.title}</h3>
              <p>Status: {course.status}</p>
              <p>SFIA Skills: {course.sfiaSkills.join(', ')}</p>
              <p>Applicable Jobs: {course.jobPositions.join(', ')}</p>
              <p>Badges Earned: {course.badges.map(b => b.title).join(', ') || 'None'}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default LearningPathTimelineSFIAJob;