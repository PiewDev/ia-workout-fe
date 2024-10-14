import { useState, useEffect, useRef } from 'react';
import './DropdownOptions.css';

export default function DropdownOptions ({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const dropdownRef = useRef(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option);    
    onSelect(option);
    setIsOpen(false);
  };
  useEffect(() => {
    console.log(options);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="dropdown-options" ref={dropdownRef}>
      <button className={`dropdown-toggle ${selectedOption ? 'selected' : 'placeholder'}`}onClick={toggleDropdown}>
        <span className="dropdown-text">
          {selectedOption ? selectedOption : 'Opciones'}
        </span>
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        {options.map((option, index) => (
          <li 
            key={index} 
            onClick={() => handleOptionClick(option.text)}
            style={{ '--li-index': index }}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
