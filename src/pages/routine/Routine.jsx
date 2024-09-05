import { useState, useEffect} from 'react'
import './Routine.css';
import Week from './components/week/Week.jsx';
import Button from '../../components/button/Button.jsx';

export default function Routine(routine) {
  const [showAbout, setShowAbout] = useState(false)
  const {plan} = routine.routine;
  useEffect(() => {
    console.log(routine, 'plan');
  }, []);
  
  return (
    <div className="training-plan">
      <h1 className='routine-title'>{plan.name}</h1>
      <p>Tipo de plan: {plan.planType}</p>
      <p>Días por semana: {plan.daysPeerWeek}</p>
      
      <Button onClick={() => setShowAbout(!showAbout)}>
        {showAbout ? 'Ocultar detalles' : 'Mostrar detalles'}
      </Button>
      
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