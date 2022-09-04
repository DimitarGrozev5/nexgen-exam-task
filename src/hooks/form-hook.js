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

  /**
   * If the consumer has provided a value and onChange,
   * it means that he wants to control the Input not through the Form
   */
  const formControl = value === undefined && onChange === undefined;

  // Setup initial values for the Input, depending on the input type
  const initValue = {
    checkbox: false,
    date: undefined,
    email: "",
    multiEmail: [],
    number: "",
    password: "",
    radio: undefined,
    search: "",
    tel: "",
    textarea: "",
    text: "",
  }[inputType];

  // Setup state for the Input element
  const [inputValue, setInputValue] = useState(initValue);
  const [showInputError, setShowInputError] = useState(false);

  // Register the Input in the allForms dictionery when the component mounts
  useEffect(() => {
    if (!formId || !formControl) {
      return;
    }
    if (!(formId in allForms)) {
      allForms[formId] = {};
    }
    if (!(inputName in allForms[formId])) {
      allForms[formId][inputName] = {
        value: inputValue,
        setValue: setInputValue,
        showError: showInputError,
        setShowInputError,
        validator,
      };
    }

    // Unregister the component in allForms before a rerender or dismount
    return () => {
      delete allForms[formId][inputName];
    };
  }, [formId, inputName, inputValue, showInputError, validator, formControl]);

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

/**
 * useFormData hook gives access to the form state
 */
export const useFormData = (formId) => {
  // GetVals function returns the values of the form inputs
  const getVals = () =>
    Object.entries(allForms[formId]).reduce((result, [key, val]) => {
      return { ...result, [key]: val.value };
    }, {});

  // isValid function validates all of the form inputs and returns the overall form validity
  const isValid = () => {
    // Get the current state of the form inputs to pass as execution context for validator function
    const stateContext = getVals();

    return Object.values(allForms[formId]).reduce((v, input) => {
      const isV = input.validator.call(stateContext, input.value);

      if (!isV) {
        input.setShowInputError(true);
        return false;
      }
      
      input.setShowInputError(false);
      return v && true;
    }, true);
  };

  return { getVals, isValid };
};
