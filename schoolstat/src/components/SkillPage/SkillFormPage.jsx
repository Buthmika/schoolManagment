import React from 'react';
import './SkillFormPage.css';
import Nav from '../nav/Nav';

function SkillFormPage() {
  return (
    <>
      <Nav />
      <div className="form-container">
        <h2 className="form-title">Tell Us About Your Skills</h2>
        <form className="skill-form">
          <div className="form-group">
            <label>Leadership Skills</label>
            <select required>
              <option value="">Select</option>
              <option value="head">Head Prefect</option>
              <option value="vice">Vice Captain</option>
              <option value="club">Club Leader</option>
              <option value="monitor">Class Monitor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sports Skills</label>
            <select required>
              <option value="">Select</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="athletics">Athletics</option>
              <option value="swimming">Swimming</option>
              <option value="volleyball">Volleyball</option>
            </select>
          </div>

          <div className="form-group">
            <label>Other Skills</label>
            <textarea placeholder="Describe any other skills or achievements..." rows="4"></textarea>
          </div>

          <div className="form-group">
            <label>Were You a Prefect?</label>
            <select required>
              <option value="">Select</option>
              <option value="yes">Yes, School Prefect</option>
              <option value="house">Yes, House Prefect</option>
              <option value="no">No</option>
            </select>
          </div>

          <button className="submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default SkillFormPage;
