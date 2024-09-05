import './button.css';

export default function Button ({ onClick, isDisabled }) {
  return (
    <button 
      onClick={onClick} 
      disabled={isDisabled}
      className={`option-button ${isDisabled ? 'disabled' : ''}`}
    >
      NEXT
    </button>
  );
}
