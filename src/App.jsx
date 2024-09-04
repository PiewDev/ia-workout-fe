import Questionnaire from './pages/questionaire/Questionaire/Questionnaire.jsx';
import Routine from './pages/routine/Routine/Routine.jsx';
import './App.css'
import React, { useState } from 'react';
import getRoutine from './services/questions/getRoutine.js';


function App() { 
  const [routine, setRoutine] = useState(null)
  
  function handleGetRoutine(answers) {
    getRoutine(answers)
      .then((data) => {
        setRoutine(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <> 
      {!routine ? <Questionnaire getRoutine={handleGetRoutine} /> : <Routine routine={routine} />}
    </>
  )
}

export default App
