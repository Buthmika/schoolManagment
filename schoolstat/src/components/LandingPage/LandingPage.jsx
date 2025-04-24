import React from 'react'
import './LandingPage.css'

function LandingPage() {
  return (
    <div>
     <div class="card">

  <div class="demo">
    
    <label class="toggle" for="toggleEnabled">
      <input type="checkbox" class="toggle__input" id="toggleEnabled" />
      <span class="toggle-track">
        <span class="toggle-indicator">
          <span class="checkMark">
            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
              <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
            </svg>
          </span>
        </span>
      </span>
      Enabled toggle label
    </label>

    
    <label class="toggle" for="toggleDisabled">
      <input type="checkbox" class="toggle__input" id="toggleDisabled" disabled />
      <span class="toggle-track">
        <span class="toggle-indicator">
          <span class="checkMark">
            <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
              <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
            </svg>
          </span>
        </span>
      </span>
      Disabled toggle label
    </label>
  </div>
</div>

    </div>
  )
}

export default LandingPage
