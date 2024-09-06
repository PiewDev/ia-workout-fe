import './Exercise.css'
export default function Exercise({ exercise }) {
  return (
    <div className="exercise">
      <h4 className='exercise-title'>{exercise.name}</h4>
        <p className="exercise-details">
          {exercise.sets} x {exercise.reps} @ {exercise.weight}kg (RIR: {exercise.RIR})
        </p>
      {exercise.PRPercent !== "N/A" && (
        <p className="exercise-details">PR%: {exercise.PRPercent}</p>
      )}
      <p className="exercise-notes">{exercise.notes}</p>
  </div>
)}