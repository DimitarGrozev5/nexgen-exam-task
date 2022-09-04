import { useContext, useEffect, useState } from "react";
import { FormContext } from "../components/Form/form-context";

/**
 * allForms object/dictionery contains all of the forms in the application
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

/**
 * The useForm hook receive data about an Input Component
 * It checks if the Input Component is inside a Form Component
 * by checking the context trough useContext
 * If so then it registers the input in the allForms dictionery above
 *
 * If the Input Component has value and onChange props provided
 * then the Input control is left to those values.
 */
export const useForm = (inputType, inputName, value, onChange, validator) => {
  // Get the formId for the Input Component that is calling the hook
  // If the formId then the Input Component is not in a Form
  const formId = useContext(FormContext);

  // Setup initial values for the Input, depending on the input type
  const initValue = {
    checkbox: false,
    date: undefined,
    email: "",
    number: "",
    password: "",
    radio: null,
    search: "",
    tel: "",
    textarea: "",
    text: "",
  }[inputType];

  // Setup state for the Input element
  const [inputValue, setInputValue] = useState(initValue);
  const [showInputError, setShowInputError] = useState(false);

  // Register the Input in the allForms dictionery above
  useEffect(() => {
    if (!formId) {
      return;
    }
    if (!(formId in allForms)) {
      allForms[formId] = {};
    }
    if (!(inputName in allForms[formId])) {
      allForms[formId][inputName] = {
        value: initValue,
        setValue: setInputValue,
        showError: showInputError,
        setShowInputError,
        validator,
      };
    }
  }, [formId, inputName, initValue, showInputError, validator]);

  /**
   * If the consumer has provided a value and onChange,
   * it means that he wants to controll the Input not through the Form,
   * so just return the values
   */
  if (value && onChange) {
    return {
      inputValue: value,
      inputOnChange: onChange,
      inputError: false,
    };
  }

  // Setup change handler function for the Input Component
  const inputOnChange = (val) => {
    setInputValue(val);
    allForms[formId][inputName].value = val;
  };

  const returnValue = formId ? inputValue : value;
  const returnOnChange = formId ? inputOnChange : onChange;
  const returnError = formId ? showInputError : false;

  return {
    inputValue: returnValue,
    inputOnChange: returnOnChange,
    inputError: returnError,
  };
};

export const useFormData = (formId) => {
  const getVals = () =>
    Object.entries(allForms[formId]).reduce((result, [key, val]) => {
      return { ...result, [key]: val.value };
    }, {});

  const isValid = () =>
    Object.values(allForms[formId]).reduce((v, input) => {
      const isV = input.validator(input.value);
      if (!isV) {
        input.setShowInputError(true);
        return false;
      }
      input.setShowInputError(false);
      return v && true;
    }, true);

  return { getVals, isValid };
};
