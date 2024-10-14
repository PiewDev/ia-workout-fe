import { useEffect, useState } from 'react';
import MultiSteps from '../../../../components/steps/MultiSteps';
import './MultiQuestion.css';
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
    <div className='multi-question'>
      <h2 className="title">{title}</h2>
      <div className="multi-question-container">
        {currentQuestions.map((question) => (
          <div className="multi-question-body" key={question.id}>
            <h3 className="sub-title">{question.question}</h3>            
            <div className='question-container'>
              <MultiSteps
                currentQuestion={question}
                handleInput={handleInput}
                currentAnswer={currentAnswers[question.id]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiQuestion;
