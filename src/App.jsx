import React, { useState } from 'react';
import './App.css';
import getRoutine from './services/questions/getRoutine.js';
import Routine from './pages/routine/Routine.jsx';
import Questionnaire from './pages/questionaire/Questionnaire.jsx';
import LoadingSpinner from './components/loading-spinner/LoadingSpinner.jsx';

function App() { 
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleGetRoutine(answers) {
    setIsLoading(true); // Mostrar el spinner de carga
    getRoutine(answers)
      .then((data) => {
        setRoutine(data);
        setIsLoading(false); // Ocultar el spinner cuando la carga haya terminado
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Ocultar el spinner en caso de error
      });
  };

  return (
    <> 
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !routine ? (
          <Questionnaire getRoutine={handleGetRoutine} />
        ) : (
          <Routine routine={routine} />
        )
      )}
    </>
  );
}

export default App;
