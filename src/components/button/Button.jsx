import './Button.css';

export default function Button ({ onClick, isDisabled, children, isSelected }) {
  return (
    <button 
      onClick={onClick} 
      disabled={isDisabled}
      className={`option-button ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
    >
      {children}
    </button>
  );
}
