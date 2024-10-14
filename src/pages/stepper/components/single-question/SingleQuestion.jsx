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
    <>
      <h2 className="title">{question.question}</h2>
      <div className='question-container'>
        <Steps
          currentQuestion={question}
          handleInput={handleInput}
          currentAnswer={currentAnswer}
        />
      </div>
    </>
  );
};

export default SingleQuestion;
