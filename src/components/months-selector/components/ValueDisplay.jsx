import { useState } from 'react';

const ValueDisplay = ({ value, onChange, label }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  
  const handleClick = () => setIsEditing(true);
  
  const handleBlur = () => {
    setIsEditing(false);
    onChange(parseInt(inputValue, 10));
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
