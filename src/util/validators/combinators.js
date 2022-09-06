/**
 * Combinators are function that take multiple validator functions
 * and combine them, to return a new validator function, that takes
 * a *ctx* object and a *val* value for validation
 */

// All of the provided validator functions have to be valid
export const all =
  (...validators) =>
  (ctx, val) =>
    validators.reduce(
      (result, validator) => result && validator(ctx, val),
      true
    );

// At least one of the provided validator functions has to be valid
export const some =
  (...validators) =>
  (ctx, val) =>
    validators.some((validator) => validator(ctx, val));
