import React, { useState } from 'react';
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import './AdminPanel.css'; // Create and style as needed

function AdminPanel() {
  const [form, setForm] = useState({
    grade: '',
    term: '',
    studentName: '',
    maths: '',
    science: '',
    sinhala: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await addDoc(collection(db, "users"), {
        grade: form.grade,
        term: form.term,
        studentName: form.studentName,
        marks: {
          maths: form.maths,
          science: form.science,
          sinhala: form.sinhala
        }
      });
      setMessage("Marks added successfully!");
      setForm({
        grade: '',
        term: '',
        studentName: '',
        maths: '',
        science: '',
        sinhala: ''
      });
    } catch (err) {
      setMessage("Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="admin-panel">
      <h2>Add Student Marks (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Student Name" required />
        <select name="grade" value={form.grade} onChange={handleChange} required>
          <option value="" disabled hidden>Grade</option>
          {[...Array(13)].map((_, i) => (
            <option key={i+1} value={i+1}>Grade {i+1}</option>
          ))}
        </select>
        <select name="term" value={form.term} onChange={handleChange} required>
          <option value="" disabled hidden>Term</option>
          <option value="1">1st Term</option>
          <option value="2">2nd Term</option>
          <option value="3">3rd Term</option>
        </select>
        <input name="maths" value={form.maths} onChange={handleChange} placeholder="Maths Marks" required />
        <input name="science" value={form.science} onChange={handleChange} placeholder="Science Marks" required />
        <input name="sinhala" value={form.sinhala} onChange={handleChange} placeholder="Sinhala Marks" required />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Marks"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminPanel;