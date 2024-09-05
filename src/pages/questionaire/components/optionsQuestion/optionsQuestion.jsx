//import '../../Questionaire/Questionnaire.css'
export default function OptionsQuestion({ question, options, onSelect, selectedAnswer }){ 
  return (
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
}