import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from '../../../services/questions/getQuestions';
import OptionsQuestion from '../components/optionsQuestion/optionsQuestion';
import NumericInputQuestion from '../components/numericInputQuestion/numericInputQuestion';
import TextInputQuestion from '../components/textInputQuestion/textInputQuestion';
import LoadingSpinner from '../../../components/spinner/spinner';
import './Questionnaire.css'
import Button from '../../../components/button/button';
// Componente principal Stepper
export default function Questionaire({getRoutine}) {
  const [questionStack, setQuestionStack] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchInitialData = async () => {    
    setLoading(true);
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


  const finishQuestionnaire = (finalAnswers) => {
    setLoading(true);
    // Simulación de envío de datos al backend
    const formattedAnswers = finalAnswers.map(({ questionId, answer }) => ({
        questionId,
        answer: answer.toString(  )
      }));    
    getRoutine(formattedAnswers);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'options':
        return (
          <OptionsQuestion 
          key={question.id} 
          question={question.question}
          options={question.options} 
          onSelect={handleInput} 
          selectedAnswer={currentAnswer}
        />
        );
      case 'numeric-input':
        return (
          <NumericInputQuestion 
            key={question.id} 
            placeholder={question.placeholder}
            onInput={handleInput}
            currentAnswer={currentAnswer}
          />
        );
      case 'text-input':
        return (
          <TextInputQuestion 
            key={question.id} 
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
        <h2>Plan de Entrenamiento de Fuerza</h2>
        {currentQuestion ? (
          <>
          
            <h3>{currentQuestion.question}</h3>
            {renderQuestion(currentQuestion)}
          
          </>
        ) : (
          <p>El cuestionario ha finalizado. ¡Gracias por tu participación!</p>
        )}
        <Button onClick={handleNext} isDisabled={currentAnswer === null} />
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