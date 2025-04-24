import React, { useState } from 'react';
import './LandingPage.css';
import Nav from '../nav/Nav';

function LandingPage() {
  const [characterChecked, setCharacterChecked] = useState(false);
  const [leavingChecked, setLeavingChecked] = useState(false);

  return (
<>
    <Nav></Nav>  
    <div className="card">
      <div className="demo">

        <label className="toggle">
          Character Certificate
          <input
            type="checkbox"
            className="toggle__input"
            checked={characterChecked}
            onChange={() => setCharacterChecked(!characterChecked)}
          />
          <span
            className="toggle-track"
            style={{ backgroundColor: characterChecked ? 'rgba(22, 160, 133, 0.8)' : undefined }}
          >
            <span className="toggle-indicator">
              <span className="checkMark">
                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                </svg>
              </span>
            </span>
          </span>
        </label>

        <label className="toggle">
          Leaving Certificate
          <input
            type="checkbox"
            className="toggle__input"
            checked={leavingChecked}
            onChange={() => setLeavingChecked(!leavingChecked)}
          />
          <span
            className="toggle-track"
            style={{ backgroundColor: leavingChecked ? 'rgba(22, 160, 133, 0.8)' : undefined }}
          >
            <span className="toggle-indicator">
              <span className="checkMark">
                <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                  <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                </svg>
              </span>
            </span>
          </span>
        </label>

      </div>
    </div>
</>    
  );
}

export default LandingPage;
