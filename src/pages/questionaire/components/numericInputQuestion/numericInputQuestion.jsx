export default function NumericInputQuestion ({ question, placeholder, onInput, currentAnswer }) { 
  return (
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
}
