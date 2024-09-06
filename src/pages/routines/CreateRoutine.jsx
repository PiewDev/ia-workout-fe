import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner.jsx";
import Routine from "./routine/Routine.jsx";
import Questionnaire from "./questionaire/Questionnaire.jsx";
import getRoutine from '../../services/routine/getRoutine.js'
import { useState } from 'react';

function CreateRoutine() { 
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleGetRoutine(answers) {
    setIsLoading(true);
    getRoutine(answers)
      .then((data) => {
        setRoutine(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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

export default CreateRoutine;
