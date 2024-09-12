const Button = ({ onClick, children, position }) => (
  <button className={`button ${position}`} onClick={onClick}>
    <div className="button-content">{children}</div>
  </button>
);
  
export default Button;
