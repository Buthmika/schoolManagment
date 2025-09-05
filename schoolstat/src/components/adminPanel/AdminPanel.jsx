import React, { useState, useEffect } from 'react';
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import './AdminPanel.css';

function AdminPanel() {
  // Marks section state
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

  // Certificate section state
  const [certificates, setCertificates] = useState([]);
  const [certLoading, setCertLoading] = useState(true);
  const [fadingCertId, setFadingCertId] = useState(null);

  useEffect(() => {
    // Fetch certificates for notification and viewing
    const fetchCertificates = async () => {
      const certSnapshot = await getDocs(collection(db, "certificates"));
      const certs = [];
      certSnapshot.forEach((doc) => {
        certs.push({ id: doc.id, ...doc.data() });
      });
      setCertificates(certs);
      setCertLoading(false);
    };
    fetchCertificates();
  }, []);

  const pendingCount = certificates.filter(cert => cert.status === "pending").length;

  const handleMarkReviewed = async (id) => {
    setFadingCertId(id);
    setTimeout(async () => {
      await updateDoc(doc(db, "certificates", id), { status: "reviewed" });
      setCertificates(certs => certs.map(cert => cert.id === id ? { ...cert, status: "reviewed" } : cert));
      setFadingCertId(null);
    }, 700); // Match animation duration
  };

  // Marks logic
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const q = query(collection(db, "users"), where("username", "==", form.username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setMessage("Student not found.");
        setLoading(false);
        return;
      }
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "users", userDoc.id), {
        grade: form.grade,
        term: form.term,
        marks: {
          maths: form.maths,
          science: form.science,
          sinhala: form.sinhala
        }
      });
      setMessage("Marks updated successfully!");
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
      {/* Marks Section (unchanged style/logic) */}
      <h2>
        Add Student Marks (Admin Only)
      </h2>
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

      {/* Certificate Section (separated, bordered, animated) */}
      <div className="certificate-section">
        <h2>
          Certificate Requests
          {pendingCount > 0 && (
            <span style={{
              background: "#e74c3c",
              color: "#fff",
              borderRadius: "50%",
              padding: "4px 10px",
              marginLeft: "12px",
              fontWeight: "bold"
            }}>
              {pendingCount}
            </span>
          )}
        </h2>
        {certLoading ? (
          <p>Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <p>No certificate requests found.</p>
        ) : (
          certificates.map(cert => (
            <div
              key={cert.id}
              className={`certificate-preview${fadingCertId === cert.id ? " certificate-fade" : ""}`}
              style={{marginBottom: "24px"}}
            >
              <div className="certificate-seal">★</div>
              <h3>Certificate Request</h3>
              <p><strong>Name:</strong> {cert.fullName}</p>
              <p><strong>Admission No:</strong> {cert.admissionNo}</p>
              <p><strong>Grade:</strong> {cert.grade}</p>
              <p><strong>Academic:</strong> {cert.academicType} - {cert.academicResults}</p>
              <p><strong>Sports:</strong> {cert.sports}</p>
              <p><strong>Leadership:</strong> {cert.leadership}</p>
              <p><strong>Services:</strong> {cert.services}</p>
              <p><strong>Achievements:</strong> {cert.achievements}</p>
              <p><strong>Other Skills:</strong> {cert.otherSkills}</p>
              <p><strong>Status:</strong> {cert.status}</p>
              {cert.status === "pending" && (
                <button className="form-submit-button" onClick={() => handleMarkReviewed(cert.id)}>
                  Mark as Reviewed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPanel;