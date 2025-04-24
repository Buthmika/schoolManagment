import React, { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div className="card">
        <div className="demo">
          {/* Character Certificate */}
          <label className="toggle" htmlFor="toggle1">
            <input
              type="checkbox"
              className="toggle__input"
              id="toggle1"
              checked={isChecked}
              onChange={handleToggle}
            />
            <span className="toggle-track">
              <span className="toggle-indicator">
                <span className="checkMark">
                  <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                    <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                  </svg>
                </span>
              </span>
            </span>
            Character Certificate
          </label>

          {/* Leaving Certificate */}
          <label className="toggle" htmlFor="toggle2">
            <input
              type="checkbox"
              className="toggle__input"
              id="toggle2"
              checked={isChecked}
              onChange={handleToggle}
            />
            <span className="toggle-track">
              <span className="toggle-indicator">
                <span className="checkMark">
                  <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                    <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                  </svg>
                </span>
              </span>
            </span>
            Leaving Certificate
          </label>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
