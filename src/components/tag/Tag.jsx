import { memo } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Tag = memo(function Tag ({ icon, name, isSelected, onClick }) {
  return (
    <span className={`tag ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {icon} {name} {isSelected ? <FaMinus className="icon" /> : <FaPlus className="icon" />}
    </span>
  );
});

export default Tag;
