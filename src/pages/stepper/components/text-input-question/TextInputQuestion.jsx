import { CARACTERS, MAXIMUM } from "../../../../utils/textConstant";

//import '../../Questionaire/Questionnaire.css'
export default function TextInputQuestion ({ question, limit, onInput, currentAnswer }){
  return (
    <div className="question-container">
       <h3 className="sub-title">{question}</h3>
      <textarea
        maxLength={limit}
        onChange={(e) => onInput(e.target.value)}
        value={currentAnswer || ''}
        className="text-input"
        placeholder={`${MAXIMUM} ${limit} ${CARACTERS}`}
      />
    </div>
  );
}