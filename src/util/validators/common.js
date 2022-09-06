/**
 * A bunch of commont simple validator functions
 * that are ment to be used in Input Components,
 * inside a Form Component
 *
 * Validators are called with Function.prototype.apply,
 * and are pased a value for *this*.
 * In all validators at execution time *this* will
 * point to the values of the other Input Components
 * in the Form
 */

// Check if field length is greather than a provided length
export const isLongerThan = (len) => (val) => {
  return val?.length > len;
};

// The Email validation is not very strict
export const isEmailLike = () => (val) =>
  /^.+@[a-zA-Z-0-9]+\..{2,}$/gm.test(val);

// Is Mobile phone
export const isMobilePhone = () => (val) =>
  /^(\+359|0) {0,1}(8|9)[1-9]([0-9]{7}|[0-9] [0-9]{2} [0-9]{2} [0-9]{2}|[0-9] [0-9]{3} [0-9]{3}| [0-9]{2} [0-9]{2} [0-9]{3}| [0-9]{3} [0-9]{4})$/g.test(
    val
  );

// Check that the value is equal to other field in the Form
export const isEqualToField = (name) =>
  function (val) {
    return this[name] === val;
  };

// Check regex
export const vRegEx = (regex) => (val) => regex.test(val);

// Check number
export const greatherThan = (num) => (val) => val > num;
export const lessThan = (num) => (val) => val < num;

export const between = (min, max) => (val) =>
  greatherThan(min)(val) && lessThan(max)(val);

// Check for equality
export const isEqualTo = (val1) => (val2) => val1 === val2;

// Check for some value
export const isTruthy = () => (val) => !!val;
