import React from 'react';
import './SkillFormPage.css';

const StudentForm = () => {
  return (
    <div className="form-container">
      <h2 className="form-title">Student Information Form</h2>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">Full Name</label>
          <input className="form-input" type="text" id="fullName" name="fullName" placeholder="Enter full name" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="admissionNo">Admission Number</label>
          <input className="form-input" type="text" id="admissionNo" name="admissionNo" placeholder="Enter admission number" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="grade">Grade Studying</label>
          <input className="form-input" type="text" id="grade" name="grade" placeholder="Enter current grade" />
        </div>

        <div className="form-group">
          <label className="form-label">Academic Performance</label>
          <div className="academic-performance">
            <select className="form-select" name="academicType" id="academicType" defaultValue="">
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
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="sports">Sports</label>
          <textarea className="form-textarea" id="sports" name="sports" placeholder="e.g., Football team 2019, Captain 2020"></textarea>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="leadership">Leadership & Posts</label>
          <textarea className="form-textarea" id="leadership" name="leadership" placeholder="e.g., Class Monitor 2015, Deputy Head Prefect"></textarea>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="services">Common Services</label>
          <textarea className="form-textarea" id="services" name="services" placeholder="e.g., Participated in all school events"></textarea>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="achievements">Special Achievements</label>
          <textarea className="form-textarea" id="achievements" name="achievements" placeholder="e.g., Won All-Island Quiz Competition"></textarea>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="otherSkills">Other Skills</label>
          <textarea className="form-textarea" id="otherSkills" name="otherSkills" placeholder="e.g., Photography, Coding, Public Speaking"></textarea>
        </div>

        <div className="form-group">
          <button className="form-submit-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
