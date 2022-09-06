/**
 * A bunch of common simple validator functions
 * that are meаnt to be used in Input Components,
 * inside a Form Component
 *
 * Validators are called with an object, containing
 * all of the values in the Form, and the value of
 * of the current Input.
 *
 * TODO: Make each validator function accept and return an error message
 */

// Check if field length is greather than a provided length
export const isLongerThan = (len) => (ctx, val) => {
  return val?.length > len;
};

// The Email validation is not very strict
export const isEmailLike = () => (ctx, val) =>
  /^.+@[a-zA-Z-0-9]+\..{2,}$/gm.test(val);

// Is BG Mobile phone
export const isMobilePhone = () => (ctx, val) =>
  /^(\+359|0) {0,1}(8|9)[1-9]([0-9]{7}|[0-9] [0-9]{2} [0-9]{2} [0-9]{2}|[0-9] [0-9]{3} [0-9]{3}| [0-9]{2} [0-9]{2} [0-9]{3}| [0-9]{3} [0-9]{4})$/g.test(
    val
  );

// Check that the value is equal to other field in the Form
export const isEqualToField = (name) => (ctx, val) => ctx[name] === val;

// Check regex
export const vRegEx = (regex) => (ctx, val) => regex.test(val);

// Check number
export const greatherThan = (num) => (ctx, val) => val > num;
export const lessThan = (num) => (ctx, val) => val < num;

export const between = (min, max) => (ctx, val) =>
  greatherThan(min)(ctx, val) && lessThan(max)(ctx, val);

// Check for equality
export const isEqualTo = (val1) => (ctx, val) => val1 === val;

// Check for some value
export const isTruthy = () => (ctx, val) => !!val;
