import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from '../../services/questions/getQuestions.js';
import  getRoutine from '../../services/routine/getRoutine.js'
import OptionsQuestion from './components/options-question/OptionsQuestion.jsx';
import NumericInputQuestion from './components/numeric-input-question/NumericInputQuestion.jsx';
import TextInputQuestion from './components/text-input-question/TextInputQuestion.jsx';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner.jsx';
import './Questionnaire.css'
import Button from '../../components/button/Button.jsx';
import { COMPLETED_CUESTIONNAIRE, FORCE_PLAN, NEXT, QUESTION_TYPES } from '../../utils/textConstant.js';
import { useAppProvider } from '../context-provider/AppProvider.jsx';
import { useNavigate } from 'react-router-dom';

// Componente principal Stepper

export default function Questionaire() {
  const [questionStack, setQuestionStack] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { updateRoutine } = useAppProvider();

  const navigate = useNavigate();

  const fetchInitialData = async () => {    
    setLoading(true);
    setError(null);
    try {
      const data = await getQuestions();
      setCurrentQuestion(data);
      setQuestionStack([data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleInput = (answer) => {
    setCurrentAnswer(answer);
  };

  const handleNext = () => {
    if (currentAnswer === null || currentAnswer === undefined) return;
    const newAnswers = [...answers, { questionId: currentQuestion.id, answer: currentAnswer }];
    setAnswers(newAnswers);
    let nextQuestion = null;
    if (currentQuestion.type === 'options') {
      const selectedOption = currentQuestion.options.find(opt => opt.text === currentAnswer);
      if (selectedOption && selectedOption.next) {
        nextQuestion = selectedOption.next.questions[0];
      }
    } else if (currentQuestion.next) {
      if (Array.isArray(currentQuestion.next.questions)) {
        nextQuestion = currentQuestion.next.questions[0];
      } else {
        nextQuestion = currentQuestion.next;
      }
    }
    if (nextQuestion) {
      setQuestionStack([...questionStack, nextQuestion]);
      setCurrentQuestion(nextQuestion);
      setCurrentAnswer(null);
    } else {
     finishQuestionnaire(newAnswers);
    }
  };


  const finishQuestionnaire = async (finalAnswers) => {
    setLoading(true);
    // Simulación de envío de datos al backend
    const formattedAnswers = finalAnswers.map(({ questionId, answer }) => ({
        questionId,
        answer: answer.toString(  )
      }));    
    const newRoutine = await getRoutine(formattedAnswers);
    console.log(newRoutine)
    updateRoutine(newRoutine);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate('/routine');
    setLoading(false);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case QUESTION_TYPES.OPTIONS:
        return (
          <OptionsQuestion 
          key={question.id} 
          question={question.question}
          options={question.options} 
          onSelect={handleInput} 
          selectedAnswer={currentAnswer}
        />
        );
      case QUESTION_TYPES.NUMERIC_INPUT:
        return (
          <NumericInputQuestion 
            key={question.id} 
            question={question.question}
            placeholder={question.placeholder}
            onInput={handleInput}
            currentAnswer={currentAnswer}
          />
        );
      case QUESTION_TYPES.TEXT_INPUT:
        return (
          <TextInputQuestion 
            key={question.id} 
            question={question.question}
            limit={question.limit}
            onInput={handleInput}
            currentAnswer={currentAnswer}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="stepper-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="stepper-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className='background-overlay'>
      <div className="stepper-container">
        <h2 className='title'>{FORCE_PLAN}</h2>
        {currentQuestion ? (
          <>
            {renderQuestion(currentQuestion)}
          </>
        ) : (
          <p>{COMPLETED_CUESTIONNAIRE}</p>
        )}
        <Button onClick={handleNext} isDisabled={currentAnswer === null}>{NEXT}</Button>
      </div>
    </div>
  );
}


// PropTypes para validación de props
OptionsQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.string,
};

NumericInputQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onInput: PropTypes.func.isRequired,
  currentAnswer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextInputQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
  currentAnswer: PropTypes.string,
};