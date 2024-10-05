import { useState, useEffect } from 'react';
import { getQuestions } from '../../services/questions/getQuestions.js';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner.jsx';
import './Stepper.css';
import Button from '../../components/button/Button.jsx';
import {
  COMPLETED_CUESTIONNAIRE,
  FORCE_PLAN,
  NEXT,
} from '../../utils/textConstant.js';
import Steps from '../../components/steps/Steps.jsx';

import MultiSteps from '../../components/steps/MultiSteps.jsx';

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
//mover a otro archivo
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

const Stepper = () => {
  //El nodo sería el objeto questions que tiene la o las preguntas actuales
  const [actualNode, setActualNode] = useState([]);
  
  //para no perder el hilo al adentrarse en las opciones
  const [nodeStack, setNodeStack] = useState([]);
  const [isValidStep, setIsValidStep] = useState(false);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addNodeStack = (newNode) => {
    //Lo agrego al inicio para después poder quitarlo al recorrerlo y siempre acceder al siguiente usando [0]
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
    if (nextNode) { //Si en donde está options también hay un next 
      addNodeStack(nextNode); //Lo encolo para recorrerlo cuando me quede sin next 
    }
    //obtengo el next de la option elegida 
    var nextOption = getNextOptionNode(optionQuestion, answers[optionQuestion.id]);

    if (!nextOption) { //Si es null es porque hasta acá llegó el camino de la option y verifico si tengo para seguir otro camino guardado en el stack
      return checkNodeStack();
    }
    //Si hay un nodo next entonces ese es el siguiente
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
    setIsValidStep(false); 
    return setActualNode(nextNode);
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
  const getActualQuestion = () =>{
    return actualNode.find(x => x.id !== 'next');
  };
  return (
    <div className="background-overlay">
      <div className="stepper-container">
        <h2 className="title">{FORCE_PLAN}</h2>
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
  
  );
};
export default Stepper;
