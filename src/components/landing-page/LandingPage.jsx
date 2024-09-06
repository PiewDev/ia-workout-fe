import React from 'react';
import './LandingPage.css';
import Button from '../button/Button.jsx';
import { APP_DESCRIPTION, APP_NAME, CREATE_ROUTINE, SUBTITLE_LANDING_PAGE } from '../../utils/textConstant.js';

const LandingPage = () => {
  const handleCreateRoutine = () => {
    alert('¡Función de crear rutina en desarrollo!');
  };

  return (
    <div className="landing-container">
      <div className="landing-overlay"></div>
      <div className="landing-content">
        <h1 className="landing-title">
          {APP_NAME}
        </h1>
        <p className="landing-subtitle">
          {SUBTITLE_LANDING_PAGE}
        </p>
        <p className="landing-about">
          {APP_NAME} {APP_DESCRIPTION}
        </p>
        <Button onClick={handleCreateRoutine} isDisabled={false}>{CREATE_ROUTINE}</Button>
      </div>
    </div>
  );
};

export default LandingPage;