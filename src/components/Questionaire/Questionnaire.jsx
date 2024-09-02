import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Componente Spinner
const Spinner = () => (
  <div className="spinner">
    <div className="spinner-inner"></div>
  </div>
);

// Componentes para cada tipo de pregunta
const OptionsQuestion = ({ question, options, onSelect, selectedAnswer }) => (
  <div className="question-container">
    <h3>{question}</h3>
    {Array.isArray(options) && options.length > 0 ? (
      options.map((option, index) => (
        <button 
          key={index} 
          onClick={() => onSelect(option.text)} 
          className={`option-button ${selectedAnswer === option.text ? 'selected' : ''}`}
        >
          {option.text}
        </button>
      ))
    ) : (
      <p>No hay opciones disponibles.</p>
    )}
  </div>
);

const NumericInputQuestion = ({ question, placeholder, onInput, currentAnswer }) => (
  <div className="question-container">
    <h3>{question}</h3>
    <input
      type="number"
      placeholder={placeholder}
      onChange={(e) => onInput(e.target.value)}
      value={currentAnswer || ''}
      className="numeric-input"
    />
  </div>
);

const TextInputQuestion = ({ question, limit, onInput, currentAnswer }) => (
  <div className="question-container">
    <h3>{question}</h3>
    <textarea
      maxLength={limit}
      onChange={(e) => onInput(e.target.value)}
      value={currentAnswer || ''}
      className="text-input"
      placeholder={`Máximo ${limit} caracteres`}
    />
  </div>
);

// Componente principal Stepper
export default function Questionaire({getRoutine}) {
  const [questionStack, setQuestionStack] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchInitialData = () => {    
    setLoading(true);
    fetch('http://localhost:3000/questions')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Lee el cuerpo de la respuesta como JSON
      })
      .then((data) => {
        setCurrentQuestion(data);
        setQuestionStack([data]);

      })
      .catch((err) => {
        setError('Error al cargar las preguntas iniciales' + err.message);
      })
      .finally(()=>{
        setLoading(false);
    }
    )
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
            question={question.question}
            placeholder={question.placeholder}
            onInput={handleInput}
            currentAnswer={currentAnswer}
          />
        );
      case 'text-input':
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
        <Spinner />
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
    <div className="stepper-container">
      <h2>Plan de Entrenamiento de Fuerza</h2>
      {currentQuestion ? (
        <>
          {renderQuestion(currentQuestion)}
          <button 
            onClick={handleNext} 
            disabled={currentAnswer === null}
            className={`next-button ${currentAnswer === null ? 'disabled' : ''}`}
          >
            NEXT
          </button>
        </>
      ) : (
        <p>El cuestionario ha finalizado. ¡Gracias por tu participación!</p>
      )}
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