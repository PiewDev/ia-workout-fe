const NumericInputQuestion = ({ placeholder, onInput, currentAnswer,maxLength }) => {
  const handleInput = (e) => {
    let value = e.target.value;
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
      e.target.value = value;
    }
  };
  return (
    <input
      type="number"
      placeholder={placeholder}
      onInput={handleInput} 
      onChange={(e) => onInput(e.target.value)}
      value={currentAnswer || ''}
      className="numeric-input"
    />
  );
};

export default NumericInputQuestion;
