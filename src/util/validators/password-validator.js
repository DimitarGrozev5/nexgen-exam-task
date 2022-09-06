import { all } from './combinators';
import { isEqualTo, isLongerThan, vRegEx } from './common';

const containsLowercaseCaseChar = vRegEx(/[a-z]/);
const containsUpperCaseChar = vRegEx(/[A-Z]/);
const containsNumber = vRegEx(/[0-9]/);

export const isValidPassword = () => (val) =>
  all(
    containsLowercaseCaseChar,
    containsUpperCaseChar,
    containsNumber,
    isLongerThan(5)
  )(val);

export const confirmPassword = (name) => (val) => {
  all(isLongerThan(0), isEqualTo(name))(val);
};
