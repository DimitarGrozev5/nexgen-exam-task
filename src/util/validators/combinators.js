export const all =
  (...validators) =>
  (val) =>
    validators.reduce((result, validator) => result && validator(val), true);

export const some =
  (...validators) =>
  (val) =>
    validators.some((validator) => validator(val));
