//import '../../Questionaire/Questionnaire.css'
export default function TextInputQuestion ({ question, limit, onInput, currentAnswer }){
  return (
    <div className="question-container">
      <h3>{question}</h3>
      <textarea
        maxLength={limit}
        onChange={(e) => onInput(e.target.value)}
        value={currentAnswer || ''}
        className="text-input"
        placeholder={`Máximo ${limit} caracteres`}
      />
    </div>
  );
}