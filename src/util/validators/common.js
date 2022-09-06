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

// Check that the value includes the char
export const includes = (char) => (val) => val.includes(char);

// Check that the value is equal to other field in the Form
export const isEqualTo = (name) =>
  function (val) {
    console.log(this[name]);
    return this[name] === val;
  };

// Check regex
export const vRegEx = (regex) => (val) => regex.test(val);
