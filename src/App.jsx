import React, { useState } from 'react';
import './App.css'
import getRoutine from './services/questions/getRoutine.js';
import Routine from './pages/routine/Routine/Routine.jsx';
import Questionnaire from './pages/questionaire/Questionaire/Questionnaire.jsx';


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
