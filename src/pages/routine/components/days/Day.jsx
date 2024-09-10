import { useState } from 'react';
import './Day.css';
import Exercise from '../exercise/Exercise.jsx';

export default function Day ({ day }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="day">
      <div className="day-header" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="sub-title">{day.day}</h3>
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
  );
}
