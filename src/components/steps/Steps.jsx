import NumericInputQuestion from '../../pages/stepper/components/numeric-input-question/NumericInputQuestion';
import OptionsQuestion from '../../pages/stepper/components/options-question/OptionsQuestion';
import TextInputQuestion from '../../pages/stepper/components/text-input-question/TextInputQuestion';
import MonthsSelector from '../months-selector/MonthsSelector';
import { QUESTION_TYPES } from '../../utils/textConstant';
import EquipmentSelector from '../equipment-selector/EquipmentSelector';
import { defaultList } from '../equipment-selector/equipmentList';

const Steps = ({ currentQuestion, handleInput, currentAnswer }) => {

  console.log(currentQuestion.input.type);
  const steps = {
    [QUESTION_TYPES.OPTIONS]: (
      <OptionsQuestion
        key={currentQuestion.id}
        onSelect={handleInput}
        options={currentQuestion.options}
        currentAnswer={currentAnswer}
      />
    ),
    [QUESTION_TYPES.MONTHS_SELECTOR]: (
      <MonthsSelector
        onInput={handleInput}
      />
    ),
    [QUESTION_TYPES.TEXT_INPUT]: (
      <TextInputQuestion
        key={currentQuestion.id}
        limit={currentQuestion.input.maxLength}
        onInput={handleInput}
      />
    ),
    [QUESTION_TYPES.NUMERIC_INPUT]: (
      <NumericInputQuestion
        key={currentQuestion.id}
        onInput={handleInput}
        currentAnswer={currentAnswer}
      />
    ),
    [QUESTION_TYPES.EQUIPMENT_PICKER]: (
      <EquipmentSelector
        defaultIdsEquipmentList= {defaultList}
        onSelectionChange={handleInput}
      />
    ),
  };
  return steps[currentQuestion.input.type] || null;
};

export default Steps;
