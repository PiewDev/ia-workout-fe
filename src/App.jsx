
import Questionnaire from './components/Questionaire/Questionnaire.jsx';
import Routine from './components/Routine/Routine.jsx';
import './App.css'
import React, { useState, useEffect } from 'react';

function App() { 
  const [routine, setRoutine] = useState(null)
  
  function getRoutine(answers) {
    var answersBody = JSON.stringify(answers) 
    fetch('http://localhost:3000/routine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: answersBody,
    }) 
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Lee el cuerpo de la respuesta como JSON
      })
      .then((data) => {
        console.log(data, 'datar');
        setRoutine(data);

      })
      .catch((err) => {
      console.log(err)
      })
  };

  return (
    <>
    {!routine ? <Questionnaire getRoutine={getRoutine} /> : <Routine routine={routine} />}
    </>
  )
}

export default App
