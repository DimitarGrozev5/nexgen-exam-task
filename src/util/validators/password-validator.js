import { all } from './combinators';
import { isEqualToField, isLongerThan, vRegEx } from './common';

/**
 * Validator function for validating a *password* field
 * and a *confirm password* field
 */

const containsLowercaseCaseChar = vRegEx(/[a-z]/);
const containsUpperCaseChar = vRegEx(/[A-Z]/);
const containsNumber = vRegEx(/[0-9]/);

export const isValidPassword = () =>
  all(
    containsLowercaseCaseChar,
    containsUpperCaseChar,
    containsNumber,
    isLongerThan(5)
  );

export const confirmPassword = (name) => all(isLongerThan(0), isEqualToField(name));
