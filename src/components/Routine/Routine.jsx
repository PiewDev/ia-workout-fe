import { useState, useEffect} from 'react'
import './Routine.css';
const Exercise = ({ exercise }) => (
  <div className="exercise">
    <h4>{exercise.name}</h4>
    <p className="exercise-details">
      {exercise.sets} x {exercise.reps} @ {exercise.weight}kg (RIR: {exercise.RIR})
    </p>
    {exercise.PRPercent !== "N/A" && (
      <p className="exercise-details">PR%: {exercise.PRPercent}</p>
    )}
    <p className="exercise-notes">{exercise.notes}</p>
  </div>
)

const Day = ({ day }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="day">
      <div className="day-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{day.day}</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="day-content">
          {day.exercises.map((exercise, index) => (
            <Exercise key={index} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  )
}

const Week = ({ week }) => (
  <div className="week">
    <h2>Semana {week.weekNumber}</h2>
    <p className="week-purpose">{week.weekPurpose}</p>
    {week.days.map((day, index) => (
      <Day key={index} day={day} />
    ))}
  </div>
)

export default function Routine(routine) {
  const [showAbout, setShowAbout] = useState(false)
  const {plan} = routine.routine;
  useEffect(() => {
    console.log(routine, 'plan');
  }, []);
  
  return (
    <div className="training-plan">
      <h1>{plan.name}</h1>
      <p>Tipo de plan: {plan.planType}</p>
      <p>Días por semana: {plan.daysPeerWeek}</p>
      
      <button onClick={() => setShowAbout(!showAbout)}>
        {showAbout ? 'Ocultar detalles' : 'Mostrar detalles'}
      </button>
      
      {showAbout && (
        <div className="about-section">
          <p>{plan.about}</p>
        </div>
      )}

      {plan.weeks.map((week, index) => (
        <Week key={index} week={week} />
      ))}
    </div>
  )
}