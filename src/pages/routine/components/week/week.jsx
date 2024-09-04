import Day from "../days/day";

export default function Week ({ week }){ 
  return (
  <div className="week">
    <h2>Semana {week.weekNumber}</h2>
    <p className="week-purpose">{week.weekPurpose}</p>
    {week.days.map((day, index) => (
      <Day key={index} day={day} />
    ))}
  </div>
)}