import { useState, useEffect } from 'react';
import { getQuestions } from '../../services/questions/getQuestions.js';
import  getRoutine from '../../services/routine/getRoutine.js';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner.jsx';
import './Stepper.css';
import Button from '../../components/button/Button.jsx';
import { COMPLETED_CUESTIONNAIRE, FORCE_PLAN, NEXT } from '../../utils/textConstant.js';
import { useAppProvider } from '../context-provider/AppProvider.jsx';
import { useNavigate } from 'react-router-dom';
import Steps from '../../components/steps/Steps.jsx';

// Componente principal Stepper

const Stepper = () => {
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
    if (currentAnswer === null || currentAnswer === undefined) {
      return;
    }
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

    const formattedAnswers = finalAnswers.map(({ questionId, answer }) => ({
      questionId,
      answer: answer.toString()
    }));
    const newRoutine = await getRoutine(formattedAnswers);
    console.log(newRoutine);
    updateRoutine(newRoutine);
    await new Promise((resolve) => setTimeout(resolve, 500));
    navigate('/routine');
    setLoading(false);
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
            <div className="question-container">
              <h3 className="sub-title">{currentQuestion.question}</h3>
              {console.log('primer llamado',currentQuestion)}
              <Steps
                currentQuestion={ currentQuestion }
                handleInput={handleInput}
                currentAnswer={currentAnswer}
              />
            </div>
          </>
        ) : (
          <p>{COMPLETED_CUESTIONNAIRE}</p>
        )}
        <Button onClick={handleNext} isDisabled={!currentAnswer}>{NEXT}</Button>
      </div>
    </div>
  );
};

export default Stepper;
