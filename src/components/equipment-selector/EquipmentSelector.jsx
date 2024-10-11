import { useState,useEffect } from 'react';
import Tag from '../tag/Tag.jsx';
import equipmentList from './equipmentList.jsx';
import './EquipmentSelector.css';

const EquipmentSelector = ({ defaultIdsEquipmentList = [], onSelectionChange = () => {} }) => {

  const [selectedEquipment, setSelectedEquipment] = useState(equipmentList.find(x => x.id === defaultIdsEquipmentList.id) || []);
  
  const onSelectEquipment = (newEquipment) => { 
    const isSelected = selectedEquipment.some(selectedEquipment => selectedEquipment.id === newEquipment.id);
    newEquipment.isSelected = !isSelected;

    const newSelectedEquipment = isSelected ?     
      selectedEquipment.filter((selectedEquipment) => selectedEquipment.id !== newEquipment.id):
      [...selectedEquipment, newEquipment]  ;
   
    return setSelectedEquipment(newSelectedEquipment);
  };
  
  useEffect(() => {
    onSelectionChange(selectedEquipment.map(equipment => equipment.id));
  }, [selectedEquipment]);

  const renderEquipmentTags = (equipmentList) => {
    return equipmentList.map(equipment => (
      <Tag
        key={equipment.id}  
        icon={equipment.icon}
        name={equipment.name}
        isSelected={equipment.isSelected}
        onClick={() => onSelectEquipment(equipment)}
      />
    ));

  };
  
  return (
    <>
      <div className="equipment-selector">
        <div className='equipment'>           
          <h3>Equipo seleccionado:</h3>
          <div className="selected-equipment">
            <div className="scanline"></div>
            {!selectedEquipment.length ? (
              <p className="no-equipment">No hay equipo seleccionado</p>
            ) : (
              renderEquipmentTags(selectedEquipment)
            )}
          </div>
        </div>
        <div className="equipment">
          <h3>Equipo disponible:</h3>
          <div className="equipment-container">
            { renderEquipmentTags(equipmentList) }
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentSelector;
