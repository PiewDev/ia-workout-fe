import { useState, useEffect } from 'react';
import { getQuestions } from '../../services/questions/getQuestions.js';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner.jsx';
import './Stepper.css';
import Button from '../../components/button/Button.jsx';
import {
  COMPLETED_CUESTIONNAIRE,
  NEXT,
} from '../../utils/textConstant.js';
import getRoutine from '../../services/questions/getRoutine.js';
import { useNavigate } from 'react-router-dom';
import { useAppProvider } from '../context-provider/AppProvider.jsx';
import MultiQuestion from './components/multi-question/MultiQuestion.jsx';
import SingleQuestion from './components/single-question/SingleQuestion.jsx';

const Stepper = () => {
  const { updateRoutine } = useAppProvider();

  const navigate = useNavigate();
  //El nodo sería el objeto questions que tiene la o las preguntas actuales
  const [actualNode, setActualNode] = useState([]);
  
  //para no perder el hilo al adentrarse en las opciones
  const [nodeStack, setNodeStack] = useState([]);
  const [isValidStep, setIsValidStep] = useState(false);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addNodeStack = (newNode) => {
    setNodeStack((prevNodeStack) => [newNode, ...prevNodeStack]);
  };
  const removeNodeStack = () => {
    setNodeStack((prevNodeStack) => prevNodeStack.slice(1));
  };  
  const getNextOptionNode = (optionQuestion, selectedOption) => {
    return optionQuestion.options.find(x=> x.text === selectedOption)?.next?.questions;
  };  
  const getSimpleNextNode = () =>{
    const next = actualNode.find((x) => x.id === 'next');
    return next?.questions;
  };  
  const getNextNode = () => {
    const nextNode = getSimpleNextNode(); //obtengo el siguiente nodo común, el que no es parte de options
    const optionQuestion = actualNode.find(x=> x.input?.type === 'options'); //obtengo el objeto options si hay en este nodo 
    if (optionQuestion) { //Si este nodo es uno de opciones   
      return manageOptionNode(nextNode,optionQuestion);
    }
    if (nextNode) {  // Checkeo si hay un next 
      return nextNode;
    }
    return checkNodeStack(); //Si no hay next veo si me quedó alguno en el stack pendiente  
  };  

  const manageOptionNode = (nextNode,optionQuestion) =>{
    var nextOption = getNextOptionNode(optionQuestion, answers[optionQuestion.id]);    
    if (!nextOption && nextNode) {
      return nextNode;
    }
    if (nextNode) {
      addNodeStack(nextNode);
    }
    if (!nextOption) {
      return checkNodeStack();
    }
    return nextOption;
  };

  const checkNodeStack = () =>{
    const nexNodeStack = nodeStack[0]; //Miro el primer nodo guardado
    if (nexNodeStack) {      //Si existe
      removeNodeStack(); //Lo remuevo del stack porque lo estoy por recorrer 
      return nexNodeStack; //Lo devuelvo
    }
    return null;
  };

  const handleNext = () => {
    const nextNode = getNextNode();
    if (nextNode) { 
      setIsValidStep(false); 
      return setActualNode(nextNode);
    }
    finishQuestionnaire(answers);
  };

  const finishQuestionnaire = async (answers) => {
    console.log(answers);
    try {
      setLoading(true);
      const newRoutine = await getRoutine(answers);
      console.log(newRoutine);
      updateRoutine(newRoutine);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (e) {
      setError(e);
    } finally {
      navigate('/routine');
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getQuestions();
      setActualNode(data.questions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const setNewAnswer = (currentQuestion, currentAnswer) => {
    const newAnswers = { ...answers };
    newAnswers[currentQuestion.id] = currentAnswer;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    console.log('cambio', nodeStack);
  }, [nodeStack]); 
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
  const getActualQuestion = () => {
    
    return actualNode.find(x => x.id !== 'next');
  };
  return (
    <div className='stepper'>
      <div className="background-overlay">
        <div className="stepper-container">
          {
            actualNode ? (
              actualNode.length > 2 ? (
                <MultiQuestion
                  questions={actualNode} 
                  setAnswer={setNewAnswer} 
                  setIsValidStep = {setIsValidStep} 
                />
              ) : (
                <SingleQuestion
                  question={getActualQuestion()}
                  setAnswer={setNewAnswer}
                  setIsValidStep = {setIsValidStep}
                />
              )
            ) : (
              <p>{COMPLETED_CUESTIONNAIRE}</p>
            )
          }
          <Button onClick={handleNext} isDisabled={!isValidStep}>
            {NEXT}
          </Button>
        </div>
      </div>
    </div>  
  );
};

export default Stepper;
