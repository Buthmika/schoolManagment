import React, { useState, useEffect } from 'react';
import './MarkPage.css';
import { db, auth } from "../../firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

function MarksSelection() {
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchStudentName = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setStudentName(userDoc.data().studentName || "");
        }
      };
      fetchStudentName();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInfo(null);

    try {
      const marksRef = collection(db, "users");
      const q = query(
        marksRef,
        where("grade", "==", grade),
        where("term", "==", term),
        where("studentName", "==", studentName)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setInfo(querySnapshot.docs[0].data());
      } else {
        setInfo({ error: "No marks found for this grade, term, and student name." });
      }
    } catch (err) {
      setInfo({ error: "Error fetching data: " + err.message });
    }
    setLoading(false);
  };

  return (
    <div className="marks-selection-bg">
      <div className="marks-selection-container">
        <h2>Select Your Marks Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="select-wrapper">
            <label className={`floating-label ${grade ? 'selected' : ''}`}>Grade</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} required>
              <option value="" disabled hidden></option>
              <option value="8">1</option>
              {/* Add other grades if needed */}
            </select>
          </div>
          <div className="select-wrapper">
            <label className={`floating-label ${term ? 'selected' : ''}`}>Term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value)} required>
              <option value="" disabled hidden></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "View Marks"}
          </button>
        </form>
        {info && (
          <div className={`info-display animated-border ${info.error ? 'error' : 'success'}`}>
            {info.error ? (
              <p>{info.error}</p>
            ) : (
              <>
                <h3 className="marks-title">Student: {info.studentName}</h3>
                <p className="marks-meta">Grade: <span>{info.grade}</span> | Term: <span>{info.term}</span></p>
                <ul className="marks-list">
                  {info.marks && Object.entries(info.marks).map(([subject, mark]) => (
                    <li key={subject} className="marks-item">
                      <span className="subject">{subject}</span>
                      <span className="mark">{mark}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MarksSelection;