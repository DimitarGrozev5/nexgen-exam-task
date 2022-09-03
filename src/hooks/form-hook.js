import { useContext, useEffect, useState } from "react";
import { FormContext } from "../components/Form/form-context";

const allForms = {};

export const useForm = (inputType, inputName, value, onChange, validator) => {
  const formId = useContext(FormContext);

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

  const [inputValue, setInputValue] = useState(initValue);
  const [showInputError, setShowInputError] = useState(false);

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
