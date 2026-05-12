import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const LearningPathTimelineInteractive = ({ userId }) => {
  const [timeline, setTimeline] = useState([]);
  const [jobFilter, setJobFilter] = useState('');

  useEffect(() => {
    const fetchTimeline = async () => {
      const res = await api.get(`/api/professional/${userId}/learning-path`);
      const courses = res.data;

      const enrichedCourses = await Promise.all(courses.map(async (course) => {
        const sfiaRes = await api.get(`/api/sfia/${course.id}`);
        const jobsRes = await api.get(`/api/jobs/${course.id}`);
        const badgesRes = await api.get(`/api/badges/user/${userId}`);

        const badgesForCourse = badgesRes.data.filter(b => b.title === course.title);

        return {
          ...course,
          sfiaSkills: sfiaRes.data.skills,
          jobPositions: jobsRes.data.jobPositions,
          badges: badgesForCourse,
          progress: course.progress || 0
        };
      }));

      setTimeline(enrichedCourses);
    };

    fetchTimeline();
  }, [userId]);

  const filteredTimeline = jobFilter ? timeline.filter(course =>
    course.jobPositions.some(job => job.toLowerCase().includes(jobFilter.toLowerCase()))
  ) : timeline;

  const handleCourseClick = (courseId) => {
    // Navigate to course lessons page
    window.location.href = `/professional/Course/${courseId}`;
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-200 p-4 h-screen">
          <h2 className="font-bold mb-4">Professional Menu</h2>
          <ul>
            <li className="mb-2"><a href="/professional/Dashboard">Dashboard</a></li>
            <li className="mb-2"><a href="/professional/LearningPathTimelineInteractive">Learning Path</a></li>
            <li className="mb-2"><a href="/professional/Courses">Courses</a></li>
            <li className="mb-2"><a href="/professional/CourseAssignments">Assignments</a></li>
            <li className="mb-2"><a href="/professional/VerifiedCredential">Verified Credentials</a></li>
          </ul>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Learning Path Timeline</h1>
          <input type="text" placeholder="Filter by job position" className="mb-4 p-1 border" value={jobFilter} onChange={e => setJobFilter(e.target.value)} />
          {filteredTimeline.map(course => (
            <div key={course.id} className="card mb-4 cursor-pointer" onClick={() => handleCourseClick(course.id)}>
              <h3 className="font-semibold">{course.title}</h3>
              <p>Status: {course.status}</p>
              <p>SFIA Skills: {course.sfiaSkills.join(', ')}</p>
              <p>Applicable Jobs: {course.jobPositions.join(', ')}</p>
              <div className="my-2">
                {course.badges.map(b => (
                  <a key={b._id} href={b.criteriaUrl} target="_blank" rel="noopener noreferrer" className="inline-block mr-2 mb-1 p-1 bg-blue-600 text-white rounded">{b.title}</a>
                ))}
              </div>
              <div className="w-full bg-gray-300 h-2 rounded mt-2">
                <div className="bg-green-600 h-2 rounded" style={{width: `${course.progress}%`}}></div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default LearningPathTimelineInteractive;