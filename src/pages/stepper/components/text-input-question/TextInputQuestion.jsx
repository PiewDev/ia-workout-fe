import { useState } from 'react';
import { CARACTERS, MAXIMUM } from '../../../../utils/textConstant';

export default function TextInputQuestion ({ limit, onInput }) {
  const [inputValue, setInputValue] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInput(value);
  };

  return (
    <>
      <textarea
        maxLength={limit}
        onChange={handleInputChange}
        value={inputValue || ''}
        className="text-input"
        placeholder={`${MAXIMUM} ${limit} ${CARACTERS}`}
      />
    </>
  );
}
