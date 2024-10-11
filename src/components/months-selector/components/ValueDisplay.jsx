import { useEffect, useState } from 'react';

const ValueDisplay = ({ value, onChange, label }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleClick = () => setIsEditing(true);
  
  const handleBlur = () => {
    setIsEditing(false);
    const numericValue = inputValue === '' ? 0 : Number(inputValue);
    onChange(numericValue);
  };
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };
  
  return (
    <div className="value-container" onClick={handleClick}>
      {isEditing ? (
        <input
          className="value"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="value">
          {value}
          <div className="hologram-effect" />
          <div className="scanline" />
        </div>
      )}
      <div className="label">{label}</div>
    </div>
  );
};
  
export default ValueDisplay;
