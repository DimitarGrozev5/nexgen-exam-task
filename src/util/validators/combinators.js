export const all =
  (...validators) =>
  (ctx, val) =>
    validators.reduce(
      (result, validator) => result && validator(ctx, val),
      true
    );

export const some =
  (...validators) =>
  (val) =>
    validators.some((validator) => validator.call(this, val));
