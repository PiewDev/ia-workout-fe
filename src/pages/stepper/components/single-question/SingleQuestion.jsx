import { useState } from 'react';
import Steps from '../../../../components/steps/Steps';

const SingleQuestion = ({ question, setAnswer, setIsValidStep }) => {
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const handleInput = (input) => {
    if (!input) {
      setCurrentAnswer(input);
      return setIsValidStep(false);
    }
    setAnswer(question, input);
    setCurrentAnswer(input);
    setIsValidStep(true);
  };

  return (
    <div className="question-container">
      <h3 className="sub-title">{question.question}</h3>
      <Steps
        currentQuestion={question}
        handleInput={handleInput}
        currentAnswer={currentAnswer}
      />
    </div>
  );
};

export default SingleQuestion;
