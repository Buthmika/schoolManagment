import React, { useState, useEffect } from 'react';
import './MarkPage.css';
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function MarksSelection() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchUserMarks = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setStudentName(data.studentName || "");
            if (Array.isArray(data.marks) && data.marks.length > 0) {
              setInfo(data.marks);
            } else {
              setInfo([]);
            }
          } else {
            setInfo([]);
          }
        } catch {
          setInfo([]);
        }
        setLoading(false);
      };
      fetchUserMarks();
    } else {
      setInfo([]);
      setLoading(false);
    }
  }, []);

  return (
    <div className="marks-selection-bg">
      <div className="marks-selection-container">
        <h2>Your Marks Details</h2>
        {loading ? (
          <p>Loading...</p>
        ) : info.length === 0 ? (
          <div className="info-display animated-border error">
            <p>No marks found for your account.</p>
          </div>
        ) : (
          info.map((mark, idx) => (
            <div key={idx} className="info-display animated-border success">
              <h3 className="marks-title">Student: {studentName}</h3>
              <p className="marks-meta">Grade: <span>{mark.grade}</span> | Term: <span>{mark.term}</span></p>
              <ul className="marks-list">
                <li className="marks-item"><span className="subject">Maths</span><span className="mark">{mark.maths}</span></li>
                <li className="marks-item"><span className="subject">Science</span><span className="mark">{mark.science}</span></li>
                <li className="marks-item"><span className="subject">Sinhala</span><span className="mark">{mark.sinhala}</span></li>
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MarksSelection;