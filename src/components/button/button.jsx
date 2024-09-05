import './button.css';

export default function Button ({ onClick, isDisabled , children}) {
  return (
    <button 
      onClick={onClick} 
      disabled={isDisabled}
      className={`option-button ${isDisabled ? 'disabled' : ''}`}
    >
     {children}
    </button>
  );
}
