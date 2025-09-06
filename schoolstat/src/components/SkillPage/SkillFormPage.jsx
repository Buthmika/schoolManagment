import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import './SkillFormPage.css';

const StudentForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    admissionNo: '',
    grade: '',
    academicType: '',
    academicResults: '',
    sports: '',
    leadership: '',
    services: '',
    achievements: '',
    otherSkills: ''
  });
  const [message, setMessage] = useState('');
  const [certificate, setCertificate] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setCertificate(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("User not logged in.");
        return;
      }
      await addDoc(collection(db, "certificates"), {
        uid: user.uid,
        email: user.email,
        ...form,
        status: "pending"
      });
      setCertificate({ ...form, name: form.fullName });
      setMessage("Certificate generated temporarily. We will verify your information and respond via email.");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleOk = () => {
    navigate("/landingPage");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Student Information Form</h2>
      <form onSubmit={handleSubmit}>
        {/* ...form fields unchanged... */}
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">Full Name</label>
          <input className="form-input" type="text" id="fullName" name="fullName" placeholder="Enter full name" value={form.fullName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="admissionNo">Admission Number</label>
          <input className="form-input" type="text" id="admissionNo" name="admissionNo" placeholder="Enter admission number" value={form.admissionNo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="grade">Grade Studying</label>
          <input className="form-input" type="text" id="grade" name="grade" placeholder="Enter current grade" value={form.grade} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Academic Performance</label>
          <div className="academic-performance">
            <select className="form-select" name="academicType" id="academicType" value={form.academicType} onChange={handleChange} required>
              <option value="" disabled>Select Type</option>
              <option value="ol">O/L</option>
              <option value="al">A/L</option>
            </select>
            <input
              className="form-input"
              type="text"
              id="academicResults"
              name="academicResults"
              placeholder="Enter Results"
              value={form.academicResults}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="sports">Sports</label>
          <textarea className="form-textarea" id="sports" name="sports" placeholder="e.g., Football team 2019, Captain 2020" value={form.sports} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="leadership">Leadership & Posts</label>
          <textarea className="form-textarea" id="leadership" name="leadership" placeholder="e.g., Class Monitor 2015, Deputy Head Prefect" value={form.leadership} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="services">Common Services</label>
          <textarea className="form-textarea" id="services" name="services" placeholder="e.g., Participated in all school events" value={form.services} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="achievements">Special Achievements</label>
          <textarea className="form-textarea" id="achievements" name="achievements" placeholder="e.g., Won All-Island Quiz Competition" value={form.achievements} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="otherSkills">Other Skills</label>
          <textarea className="form-textarea" id="otherSkills" name="otherSkills" placeholder="e.g., Photography, Coding, Public Speaking" value={form.otherSkills} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <button className="form-submit-button" type="submit">Submit</button>
        </div>
      </form>
      {certificate && (
        <div className="certificate-preview">
          <div className="certificate-seal">★</div>
          <h3>Temporary Certificate</h3>
          <p><strong>Name:</strong> {certificate.name}</p>
          <p><strong>Admission No:</strong> {certificate.admissionNo}</p>
          <p><strong>Grade:</strong> {certificate.grade}</p>
          <p><strong>Academic:</strong> {certificate.academicType} - {certificate.academicResults}</p>
          <p><strong>Sports:</strong> {certificate.sports}</p>
          <p><strong>Leadership:</strong> {certificate.leadership}</p>
          <p><strong>Services:</strong> {certificate.services}</p>
          <p><strong>Achievements:</strong> {certificate.achievements}</p>
          <p><strong>Other Skills:</strong> {certificate.otherSkills}</p>
        </div>
      )}
      {message && (
        <div className="info-message">
          {message}
          <button className="form-submit-button" style={{marginTop: "20px"}} onClick={handleOk}>OK</button>
        </div>
      )}
    </div>
  );
};

export default StudentForm;