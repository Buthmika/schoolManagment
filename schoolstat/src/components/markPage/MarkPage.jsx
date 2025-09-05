import React, { useState, useEffect } from 'react';
import './MarkPage.css';
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function MarksSelection() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const fetchUserMarks = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.marks) {
              setInfo({
                studentName: data.studentName,
                grade: data.grade,
                term: data.term,
                marks: data.marks
              });
            } else {
              setInfo({ error: "No marks found for your account." });
            }
          } else {
            setInfo({ error: "User data not found." });
          }
        } catch (err) {
          setInfo({ error: "Error fetching data: " + err.message });
        }
        setLoading(false);
      };
      fetchUserMarks();
    } else {
      setInfo({ error: "User not logged in." });
      setLoading(false);
    }
  }, []);

  return (
    <div className="marks-selection-bg">
      <div className="marks-selection-container">
        <h2>Your Marks Details</h2>
        {loading ? (
          <p>Loading...</p>
        ) : info && (
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