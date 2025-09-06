import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "./MarkPage.css";

// Group marks by grade and term
function groupMarksByGradeTerm(marksArray) {
  const grouped = {};
  marksArray.forEach(mark => {
    const grade = mark.grade || "";
    const term = mark.term || "";
    const key = `Grade ${grade} - Term ${term}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(mark);
  });
  return grouped;
}

function MarkPage() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          let marksData = data.marks || [];
          // Support both array and object for backward compatibility
          if (Array.isArray(marksData)) {
            setMarks(marksData);
          } else if (typeof marksData === "object" && marksData !== null) {
            setMarks([
              {
                grade: data.grade || "",
                term: data.term || "",
                maths: marksData.maths || "",
                science: marksData.science || "",
                sinhala: marksData.sinhala || ""
              }
            ]);
          } else {
            setMarks([]);
          }
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        setError("Failed to fetch marks.");
      }
      setLoading(false);
    };

    fetchMarks();
  }, []);

  // Group marks by grade and term
  const groupedMarks = groupMarksByGradeTerm(marks);

  return (
    <div className="marks-selection-bg">
      <div className="marks-selection-container">
        <h2 className="marks-title">Your Marks</h2>
        {loading ? (
          <div className="info-display">Loading...</div>
        ) : error ? (
          <div className="info-display error">{error}</div>
        ) : marks.length === 0 ? (
          <div className="info-display">No marks available.</div>
        ) : (
          Object.keys(groupedMarks).map((key, idx) => (
            <div key={key} className="info-display success" style={{ animation: "fadeIn 0.7s" }}>
              <div className="marks-meta">
                <span><strong>{key}</strong></span>
              </div>
              <ul className="marks-list">
                {groupedMarks[key].map((mark, mIdx) => (
                  <React.Fragment key={mIdx}>
                    {mark.maths !== undefined && (
                      <li className="marks-item">
                        <span className="subject">Maths</span>
                        <span className="mark">{mark.maths}</span>
                      </li>
                    )}
                    {mark.science !== undefined && (
                      <li className="marks-item">
                        <span className="subject">Science</span>
                        <span className="mark">{mark.science}</span>
                      </li>
                    )}
                    {mark.sinhala !== undefined && (
                      <li className="marks-item">
                        <span className="subject">Sinhala</span>
                        <span className="mark">{mark.sinhala}</span>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MarkPage;