import Day from "../days/Day.jsx";
import './Week.css'
import { WEEK } from "../../../../../utils/textConstant.js";
export default function Week ({ week }){ 
  return (
  <div className="week">
    <h2 className='title'>{WEEK} {week.weekNumber}</h2>
    <p className="week-purpose">{week.weekPurpose}</p>
    {week.days.map((day, index) => (
      <Day key={index} day={day} />
    ))}
  </div>
)}