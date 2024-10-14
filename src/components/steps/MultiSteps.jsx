import NumericInputQuestion from '../../pages/stepper/components/numeric-input-question/NumericInputQuestion';
import TextInputQuestion from '../../pages/stepper/components/text-input-question/TextInputQuestion';
import MonthsSelector from '../months-selector/MonthsSelector';
import { QUESTION_TYPES } from '../../utils/textConstant';
import DropdownOptions from '../../pages/stepper/components/dropdown-options/DropdownOptions';
const MultiSteps = ({ currentQuestion, handleInput, currentAnswer }) => {
  function handleMultiInput (currentAnswer) {
    handleInput(currentQuestion, currentAnswer);
  }
  const steps = {
    [QUESTION_TYPES.OPTIONS]: (
      <DropdownOptions
        key={currentQuestion.id}
        onSelect={handleMultiInput}
        options={currentQuestion.options}
        currentAnswer={currentAnswer}
      />
    ),
    [QUESTION_TYPES.MONTHS_SELECTOR]: (
      <MonthsSelector
        onInput={handleMultiInput}
      />
    ),
    [QUESTION_TYPES.TEXT_INPUT]: (
      <TextInputQuestion
        key={currentQuestion.id}
        limit={currentQuestion.limit}
        onInput={handleMultiInput}
        currentAnswer={currentAnswer}
      />
    ),
    [QUESTION_TYPES.NUMERIC_INPUT]: (
      <NumericInputQuestion
        key={currentQuestion.id}
        onInput={handleMultiInput}
        currentAnswer={currentAnswer}
        placeholder={currentQuestion.input.placeholder}
        maxLength={currentQuestion.input.maxLength}
      />
    ),
  };
  return steps[currentQuestion.input.type] || null;
};


export default MultiSteps;
