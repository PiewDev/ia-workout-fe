import { useState } from 'react';
import Button from '../../../../components/button/Button';
import { NO_OPTIONS_AVAILABLE } from '../../../../utils/textConstant';

//import '../../Questionaire/Questionnaire.css'
export default function OptionsQuestion ({ options, onSelect }) { 
  const [isSelected, setIsSelected] = useState(null);
  return (
    <>
      {Array.isArray(options) && options.length > 0 ? (
        options.map((option, index) => (
          <Button 
            key={index} 
            onClick={() => {
              onSelect(option.text);
              setIsSelected(option.text);
            }} 
            className={'option-button'}
            isSelected={isSelected === option.text}
          >
            {option.text}
          </Button>
        ))
      ) : (
        <p>{NO_OPTIONS_AVAILABLE}</p>
      )}
    </>
  );
}
