import { CARACTERS, MAXIMUM } from '../../../../utils/textConstant';

//import '../../Questionaire/Questionnaire.css'
export default function TextInputQuestion ({ limit, onInput, currentAnswer }) {
  return (
    <>
      <textarea
        maxLength={limit}
        onChange={(e) => onInput(e.target.value)}
        value={currentAnswer || ''}
        className="text-input"
        placeholder={`${MAXIMUM} ${limit} ${CARACTERS}`}
      />
    
    </>
  );
}
