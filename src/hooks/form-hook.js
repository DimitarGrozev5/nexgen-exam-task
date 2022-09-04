import { useContext, useEffect, useState } from "react";
import { FormContext } from "../components/Form/form-context";

/**
 * allForms is an object/dictionery and contains all of the forms in the application
 * Each form is stored as a key-value pair - [formId]: inputElements
 *
 * The inputElements object stores data about the input elements of the specific form
 * Each input element is a key-value pair - [inputName]: inputElementData
 *
 * The inputElementData has the following properties:
 * value - the current value of the input
 * setValue - useState setter function for the value
 * showError - boolean flag that indicates wheter to show an error message
 * setShowInputError - useState setter for showError
 * validator - validator function for the input
 */
const allForms = {};

// GetVals function returns the values of the form inputs
const getVals = (formId) =>
  Object.entries(allForms[formId]).reduce((result, [key, val]) => {
    return { ...result, [key]: val.value };
  }, {});

/**
 * The *validate* function tests the validity of the targeted input
 *
 * It invokes the input validator function, by passing an object,
 * containing all of the forms input names and values as key-value pairs
 *
 * In this way the Input components accept a *validator* function,
 * that uses the *this* keyword, to reference other inputs in the same form
 */
const validate = (formId, inputName) => {
  const validator = allForms[formId][inputName].validator;
  const ctx = getVals(formId);
  const isValid = validator.call(ctx, allForms[formId][inputName].value);

  return isValid;
};

/**
 * The useForm hook receive data about an Input Component
 * It checks if the Input Component is inside a Form Component
 * by checking the context trough useContext
 * If so then it registers the input in the allForms dictionery above
 *
 * If the Input Component has value and onChange props provided
 * then the Input control is left to those values.
 */
export const useForm = (initValue, inputName, value, onChange, validator) => {
  /**
   * Get the formId for the Input Component that is calling the hook
   * If the formId is null then the Input Component is not in a Form
   */
  const formId = useContext(FormContext);

  /**
   * If the consumer has provided a value and onChange,
   * it means that he wants to control the Input not through the Form
   */
  const formControl = value === undefined && onChange === undefined;

  // Setup state for the Input element
  const [inputValue, setInputValue] = useState(initValue);
  const [showInputError, setShowInputError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Register the Input in the allForms dictionery when the component mounts
  useEffect(() => {
    if (!formId || !formControl) {
      return;
    }
    if (!(formId in allForms)) {
      allForms[formId] = {};
    }
    if (!(inputName in allForms[formId])) {
      /**
       * Input state values and setters are stored
       * so they can be used from other parts of the program
       * to read the data and to force state changes for the input
       */
      allForms[formId][inputName] = {
        value: inputValue,
        setValue: setInputValue,
        showError: showInputError,
        setShowInputError,
        isTouched: isTouched,
        setIsTouched,
        validator,
      };
    }

    // Unregister the component in allForms before a rerender or dismount
    // This helps with forms that have dynamic content
    return () => {
      delete allForms[formId][inputName];
    };
  }, [
    formId,
    inputName,
    inputValue,
    showInputError,
    validator,
    formControl,
    setIsTouched,
  ]);

  /**
   * If the consumer has provided a value and onChange,
   * it means that he wants to controll the Input not through the Form,
   * so just return the values
   */
  if (!formControl) {
    return {
      inputValue: value,
      inputOnChange: onChange,
      inputError: false,
      inputonBlur: () => {},
    };
  }

  // Setup change handler function for the Input Component
  const inputOnChange = (val) => {
    const input = allForms[formId][inputName];
    setInputValue(val);
    input.value = val;

    if (input.isTouched) {
      const isValid = validate(formId, inputName);
      input.setShowInputError(!isValid);
    }
  };

  // Setup blur handler function for validation purposes
  const inputOnBlur = () => {
    setIsTouched(true);
    const isValid = validate(formId, inputName);
    allForms[formId][inputName].setShowInputError(!isValid);
  };

  const returnValue = formId ? inputValue : value;
  const returnOnChange = formId ? inputOnChange : onChange;
  const returnError = formId ? showInputError : false;
  const returnOnBlur = formId ? inputOnBlur : () => {};

  return {
    inputValue: returnValue,
    inputOnChange: returnOnChange,
    inputError: returnError,
    inputOnBlur: returnOnBlur,
  };
};

/**
 * useFormData hook gives access to the form state
 */
export const useFormData = (formId) => {
  // isValid function validates all of the form inputs and returns the overall form validity
  const isValid = () => {
    return Object.entries(allForms[formId]).reduce((v, [inputName, input]) => {
      input.setIsTouched(true);

      const isV = validate(formId, inputName);
      // const isV = input.validator.call(stateContext, input.value);

      if (!isV) {
        input.setShowInputError(true);
        return false;
      }

      input.setShowInputError(false);
      return v && true;
    }, true);
  };

  return { getVals: () => getVals(formId), isValid };
};
