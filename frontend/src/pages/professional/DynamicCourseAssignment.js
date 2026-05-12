import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../utils/api';
import '../../styles/moodle.css';

const DynamicCourseAssignment = ({ courseId }) => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const courseRes = await api.get(`/api/courses/${courseId}`);
      setCourse(courseRes.data);

      const teachersRes = await api.get(`/api/users?role=teacher`);
      setTeachers(teachersRes.data);

      const studentsRes = await api.get(`/api/users?role=student`);
      setStudents(studentsRes.data);
    };

    fetchData();
  }, [courseId]);

  const handleAssignTeacher = async (teacherId) => {
    await api.post(`/api/courses/${courseId}/assign-teacher`, { teacherId });
    alert('Teacher assigned successfully!');
  };

  const handleAssignStudent = async (studentId) => {
    await api.post(`/api/courses/${courseId}/assign-student`, { studentId });
    alert('Student assigned successfully!');
  };

  if(!course) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dynamic Course Assignment for {course.title}</h1>
        <section className="mb-4">
          <h2 className="font-semibold mb-2">Assign Teacher</h2>
          <ul>
            {teachers.map(t => (
              <li key={t._id} className="mb-2">
                {t.name} <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleAssignTeacher(t._id)}>Assign</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-semibold mb-2">Assign Student</h2>
          <ul>
            {students.map(s => (
              <li key={s._id} className="mb-2">
                {s.name} <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => handleAssignStudent(s._id)}>Assign</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default DynamicCourseAssignment;