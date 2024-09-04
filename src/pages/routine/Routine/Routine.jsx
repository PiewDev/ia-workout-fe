import { useState, useEffect} from 'react'
import './Routine.css';
import Week from '../components/week/week';

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