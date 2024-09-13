import { useState,useEffect, useCallback, memo } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import equipmentList from './equipmentList.jsx';
import './EquipmentSelector.css';



const useEquipmentSelection = (defaultEquipment = [], onSelectionChange = () => {}) => {
  const [selectedEquipment, setSelectedEquipment] = useState(defaultEquipment);

  const toggleEquipment = useCallback((id) => {
    setSelectedEquipment(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      onSelectionChange(newSelection);
      return newSelection;
    });
  }, [onSelectionChange]);

  return { selectedEquipment, toggleEquipment };
};

const Tag = memo(function Tag ({ equipment, isSelected, onClick }) {
  return (
    <span className={`tag ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      {equipment.icon} {equipment.name} {isSelected ? <FaMinus className="icon" /> : <FaPlus className="icon" />}
    </span>
  );
});


const EquipmentSelector = ({ defaultEquipment = [], onSelectionChange = () => {} }) => {
  const { selectedEquipment, toggleEquipment } = useEquipmentSelection(defaultEquipment, onSelectionChange);

  useEffect(() => {
    onSelectionChange(selectedEquipment);
  }, []);

  return (
    <>
      <div className="equipment-selector">
        <div className='equipment'>           
          <h3>Equipo seleccionado:</h3>
          <div className="selected-equipment">
            <div className="scanline"></div>
            {selectedEquipment.length === 0 ? (
              <p className="no-equipment">No hay equipo seleccionado</p>
            ) : (
              selectedEquipment.map(id => {
                const equipment = equipmentList.find(e => e.id === id);
                return (
                  <Tag
                    key={id}
                    equipment={equipment}
                    isSelected={true}
                    onClick={() => toggleEquipment(id)}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="equipment">
          <h3>Equipo disponible:</h3>
          <div className="equipment-container">
            {equipmentList.map(equipment => (
              <Tag
                key={equipment.id}
                equipment={equipment}
                isSelected={selectedEquipment.includes(equipment.id)}
                onClick={() => toggleEquipment(equipment.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentSelector;
