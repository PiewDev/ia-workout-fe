import { SYMBOLS } from '../../../../utils/textConstant';
import './Exercise.css';
export default function Exercise ({ exercise }) {
  return (
    <div className="exercise">
      <h4 className='exercise-title'>{exercise.name}</h4>
      <p className="exercise-details">
        {exercise.sets} {SYMBOLS.X} {exercise.reps} {SYMBOLS.AT_SING} {exercise.weight}{SYMBOLS.KG} ({SYMBOLS.RIR} {exercise.RIR})
      </p>
      {exercise.PRPercent !== 'N/A' && (
        <p className="exercise-details">{SYMBOLS.PR_PERCENT} {exercise.PRPercent}</p>
      )}
      <p className="exercise-notes">{exercise.notes}</p>
    </div>
  );
}
