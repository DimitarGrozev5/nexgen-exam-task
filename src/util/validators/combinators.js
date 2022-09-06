export const all = (...validators) =>
  function (val) {
    return validators.reduce(
      (result, validator) => result && validator.call(this, val),
      true
    );
  };

export const some = (...validators) =>
  function (val) {
    return validators.some((validator) => validator.call(this, val));
  };
