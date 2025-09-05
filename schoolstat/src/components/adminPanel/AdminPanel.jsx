import React, { useState } from 'react';
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import './AdminPanel.css';

function AdminPanel() {
  const [form, setForm] = useState({
    username: '',
    grade: '',
    term: '',
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
      // Find user by username
      const q = query(collection(db, "users"), where("username", "==", form.username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setMessage("Student not found.");
        setLoading(false);
        return;
      }
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "users", userDoc.id), {
        marks: arrayUnion({
          grade: form.grade,
          term: form.term,
          maths: form.maths,
          science: form.science,
          sinhala: form.sinhala
        })
      });
      setMessage("Marks added successfully!");
      setForm({
        username: '',
        grade: '',
        term: '',
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
        <input name="username" value={form.username} onChange={handleChange} placeholder="Student Username" required />
        <select name="grade" value={form.grade} onChange={handleChange} required>
          <option value="" disabled hidden>Grade</option>
          {[...Array(13)].map((_, i) => (
            <option key={i+1} value={i+1}>{i+1}</option>
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