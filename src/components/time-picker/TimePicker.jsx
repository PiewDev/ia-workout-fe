import { useState, useCallback, useEffect } from 'react';
import './TimePicker.css';
import Button from './components/Button.jsx';
import ValueDisplay from './components/ValueDisplay.jsx';

const TimePicker = ({ onChange }) => {
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);

  const updateTotalMonths = useCallback(() => {
    const totalMonths = years * 12 + months;
    onChange(totalMonths);
  }, [years, months, onChange]);

  useEffect(() => {
    updateTotalMonths();
  }, [years, months, updateTotalMonths]);

  const incrementYears = useCallback(() => setYears(prev => prev + 1), []);
  const decrementYears = useCallback(() => setYears(prev => Math.max(0, prev - 1)), []);
  const incrementMonths = useCallback(() => {
    setMonths(prev => {
      if (prev === 11) {
        setYears(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  }, []);
  const decrementMonths = useCallback(() => {
    setMonths(prev => {
      if (prev === 0 && years > 0) {
        setYears(y => y - 1);
        return 11;
      }
      return Math.max(0, prev - 1);
    });
  }, [years]);

  const handleYearChange = useCallback((newValue) => {
    setYears(Math.max(0, newValue));
  }, []);

  const handleMonthChange = useCallback((newValue) => {
    if (newValue >= 0 && newValue <= 11) {
      setMonths(newValue);
    } else if (newValue > 11) {
      const additionalYears = Math.floor(newValue / 12);
      setYears(y => y + additionalYears);
      setMonths(newValue % 12);
    }
  }, []);
 

  return (
    <div className="outer-container" tabIndex={0}>
      <div className="container">
        <div className="column">
          <Button onClick={incrementYears} position="top">
          </Button>
          <ValueDisplay value={years} onChange={handleYearChange} label="años" />
          <Button onClick={decrementYears} position="bottom">
          </Button>
        </div>
        <div className="column">
          <Button onClick={incrementMonths} position="top">
          </Button>
          <ValueDisplay value={months} onChange={handleMonthChange} label="meses" />
          <Button onClick={decrementMonths} position="bottom">
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
