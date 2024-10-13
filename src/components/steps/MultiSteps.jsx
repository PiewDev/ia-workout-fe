import NumericInputQuestion from '../../pages/stepper/components/numeric-input-question/NumericInputQuestion';
import OptionsQuestion from '../../pages/stepper/components/options-question/OptionsQuestion';
import TextInputQuestion from '../../pages/stepper/components/text-input-question/TextInputQuestion';
import MonthsSelector from '../months-selector/MonthsSelector';
import { QUESTION_TYPES } from '../../utils/textConstant';

const MultiSteps = ({ currentQuestion, handleInput, currentAnswer }) => {
  function handleMultiInput (currentAnswer) {
    handleInput(currentQuestion, currentAnswer);
  }
  const steps = {
    [QUESTION_TYPES.OPTIONS]: (
      <OptionsQuestion
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
      />
    ),
  };
  return steps[currentQuestion.input.type] || null;
};

export default MultiSteps;
