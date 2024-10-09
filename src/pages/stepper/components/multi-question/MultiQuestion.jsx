import { useEffect, useState } from 'react';
import MultiSteps from '../../../../components/steps/MultiSteps';

//mover a otro archivo
const MultiQuestion = ({ questions, setAnswer, setIsValidStep }) => {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [title, setTitle] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  const handleInput = (currentQuestion, currentAnswer) => {
    let updatedAnswers = currentAnswers;
    if (!currentAnswer) {
      delete updatedAnswers[currentQuestion.id];
    } else {
      updatedAnswers = { ...updatedAnswers, [currentQuestion.id]: currentAnswer };
      setAnswer(currentQuestion, currentAnswer);
    }
    setCurrentAnswers(updatedAnswers);
    const answersCount = Object.keys(updatedAnswers).length;
    setIsValidStep(answersCount === currentQuestions.length);
    
  };

  useEffect(() => {
    const titleQuestion = questions.find(q => q.id === 'title');
    setTitle(titleQuestion ? titleQuestion.title : '');
    setCurrentQuestions(questions.filter(q => q.id !== 'title' && q.id !== 'next'));
  }, []);

  return (
    <>
      <h3 className="sub-title">{title}</h3>
      <div className="question-container">
        {currentQuestions.map((question) => (
          <div key={question.id}>
            <h3 className="sub-title">{question.question}</h3>
            <MultiSteps
              currentQuestion={question}
              handleInput={handleInput}
              currentAnswer={currentAnswers[question.id]}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiQuestion;
