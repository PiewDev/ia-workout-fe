import Button from "../../../../components/button/Button";

//import '../../Questionaire/Questionnaire.css'
export default function OptionsQuestion({ question, options, onSelect, selectedAnswer }){ 
  return (
    <div className="question-container">
       <h3 className="sub-title">{question}</h3>
      {Array.isArray(options) && options.length > 0 ? (
        options.map((option, index) => (
          <Button 
            key={index} 
            onClick={() => onSelect(option.text)} 
            className={`option-button ${selectedAnswer === option.text ? 'selected' : ''}`}
          >
            {option.text}
          </Button>
        ))
      ) : (
      <p>No hay opciones disponibles.</p>
      )}
    </div>
  );
}