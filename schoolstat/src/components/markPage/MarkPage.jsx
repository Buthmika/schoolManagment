import React, { useState } from 'react';
import './MarkPage.css';

function MarksSelection() {
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Grade: ${grade}, Term: ${term}`);
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

          <button type="submit">View Marks</button>
        </form>
      </div>
    </div>
  );
}

export default MarksSelection;
