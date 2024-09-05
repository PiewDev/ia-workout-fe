import React from 'react';
import './LandingPage.css';
import Button from '../button/button';

const LandingPage = () => {
  const handleCreateRoutine = () => {
    alert('¡Función de crear rutina en desarrollo!');
  };

  return (
    <div className="landing-container">
      <div className="landing-overlay"></div>
      <div className="landing-content">
        <h1 className="landing-title">
          distopicWorkout
        </h1>
        <p className="landing-subtitle">
          Entrenamiento de fuerza con IA
        </p>
        <p className="landing-about">
          distopicWorkout utiliza inteligencia artificial avanzada para generar rutinas de entrenamiento de fuerza personalizadas. 
          Optimiza tu rendimiento y alcanza tus objetivos de fitness con planes de entrenamiento adaptados a tus necesidades en un futuro distópico.
        </p>
        <Button onClick={handleCreateRoutine} isDisabled={false} />
      </div>
    </div>
  );
};

export default LandingPage;