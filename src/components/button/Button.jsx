import './Button.css';

export default function Button ({ onClick, isDisabled, children, isSelected, isNext }) {
  return (
    <button 
      onClick={onClick} 
      disabled={isDisabled}
      className={`option-button ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isNext ? 'next' : ''}`}
    >
      {children}
    </button>
  );
}
