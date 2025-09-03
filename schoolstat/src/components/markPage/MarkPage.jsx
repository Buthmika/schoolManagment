import React, { useState } from 'react';
import './MarkPage.css';
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

function MarksSelection() {
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInfo(null);

    try {
      const marksRef = collection(db, "users");
      const q = query(
        marksRef,
        where("grade", "==", grade),
        where("term", "==", term)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setInfo(querySnapshot.docs[0].data());
      } else {
        setInfo({ error: "No marks found for this grade and term." });
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
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
              <option value="13">Grade 13</option>
            </select>
          </div>
          <div className="select-wrapper">
            <label className={`floating-label ${term ? 'selected' : ''}`}>Term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value)} required>
              <option value="" disabled hidden></option>
              <option value="1">1st Term</option>
              <option value="2">2nd Term</option>
              <option value="3">3rd Term</option>
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