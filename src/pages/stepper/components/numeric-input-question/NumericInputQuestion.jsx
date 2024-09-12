const NumericInputQuestion = ({ placeholder, onInput, currentAnswer }) => {
  return (
    <div className="question-container">
      <input
        type="number"
        placeholder={placeholder}
        onChange={(e) => onInput(e.target.value)}
        value={currentAnswer || ''}
        className="numeric-input"
      />
    </div>
  );
};

export default NumericInputQuestion;
