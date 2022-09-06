import { useId, useState } from 'react';

import './App.css';
import TextInput from './components/TextInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PaswordInput';
import SearchInput from './components/SearchInput';
import NumberInput from './components/NumberInput';
import CheckboxInput from './components/CheckboxInput';
import RadioInput from './components/RadioInput';
import TelInput from './components/TelInput';
import DateInput from './components/DateInput';
import TextareaInput from './components/TextareaInput';
import Form from './components/Form';
import FormGroup from './components/FormGroup';
import Button from './components/Button';
import { useHTTPClient } from './hooks/useHTTPClient';
import Modal from './components/Modal';
import FileInput from './components/FileInput';
import {
  between,
  isEmailLike,
  isLongerThan,
  isTruthy,
} from './util/validators/common';
import {
  confirmPassword,
  isValidPassword,
} from './util/validators/password-validator';
import { validEmailsList } from './util/validators/multiple-email';

function App() {
  // Generate an ID for the Form
  const formId = useId();

  // Control Form dynamci content
  const [addExtraTextarea, setAddExtraTextarea] = useState(false);

  // Setup state for the information modal
  const [msgModal, setMsgModal] = useState(null);

  // Get the http client
  const { isLoading, error, clearError, sendRequest } = useHTTPClient();

  // Change the text of the submit button, depending on the load status
  const submitText = isLoading ? 'Loading...' : 'Submit';

  // Setup a handler for the form submit event
  const submitHandler = async (formRawData) => {
    // The handler creates a new FormData object, because the Form contains a file input, that can't be passed through json
    const formData = new FormData();
    for (const name in formRawData) {
      formData.append(name, formRawData[name]);
    }

    try {
      // Send a post request with the form data
      await sendRequest.post(
        `https://hookb.in/${process.env.REACT_APP_POST_BIN_URL}`,
        formData
      );

      // Open the information modal
      setMsgModal(
        <>
          Data is posted. You can see the data at{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://hookbin.com/${process.env.REACT_APP_POST_BIN_URL}`}
          >
            hookbin.com
          </a>
        </>
      );
    } catch (err) {}
  };

  return (
    <>
      {msgModal && (
        <Modal
          title="Information"
          message={msgModal}
          onClose={setMsgModal.bind(null, null)}
        />
      )}
      {error && <Modal title="Error" message={error} onClose={clearError} />}

      <div className="App">
        <h1 className="h1">Enter your information</h1>
        <Form id={formId} onSubmit={submitHandler}>
          <FormGroup>
            <TextInput
              label="Name (text input):"
              name="form-text"
              errorMsg="Please enter a value!!"
              validator={isLongerThan(0)}
              placeholder="First and Last"
              // initValue="Test"
            />

            <EmailInput
              label="Email (email input):"
              name="form-email"
              errorMsg="Please enter a valid email!!"
              validator={isEmailLike()}
              placeholder="email@example.com"
              // initValue="Test"
            />

            <PasswordInput
              label="Password (password input):"
              name="form-password"
              errorMsg="Please enter a password!"
              validator={isValidPassword()}
              placeholder="**********"
              // initValue="Test"
            />

            <PasswordInput
              label="Reenter password:"
              name="form-password-2"
              errorMsg="Passwords don't match!"
              validator={confirmPassword('form-password')}
              placeholder="validator here is a bit different"
              // initValue="Test"
            />
          </FormGroup>

          <FormGroup>
            <SearchInput
              label="Type a query (search input):"
              name="form-search"
              placeholder="Start typing..."
              // initValue="Test"
            />

            <NumberInput
              label="Enter a number (number input):"
              name="form-number"
              placeholder="Enter your value"
              errorMsg="Number is out of bounds"
              validator={between(3, 10)}
              // initValue={15}
            />

            <CheckboxInput
              label="Check this box! (checkbox input)"
              name="form-checkbox"
              // initValue={true}
            />
          </FormGroup>
          <FormGroup>
            <RadioInput
              label="Select one of these options! (radio input):"
              name="test-radio"
              errorMsg="Some radio error!"
              validator={isTruthy()}
              options={[
                { val: 'ok', label: 'OK' },
                { val: 'no', label: 'No' },
                { val: 'maybe', label: 'Maybe later' },
              ]}
              // initValue="no"
            />

            <TelInput
              label="Give me your telephone (tel input):"
              name="form-tel"
              errorMsg="Invalid phone!"
              validator={isLongerThan(6)}
              placeholder="088 123 1234"
              // initValue="Test"
            />

            <DateInput
              label="Date of birth (date input):"
              name="form-date"
              errorMsg="Please enter date!"
              validator={isTruthy()}
              // initValue={new Date()}
            />
          </FormGroup>

          <FormGroup>
            <TextareaInput
              label="What's on your mind? (textarea):"
              name="form-textarea"
              errorMsg="Some textarea error!"
              validator={isLongerThan(0)}
              placeholder="Enter your value"
              // initValue="Test"
            />
            <CheckboxInput
              label="Add an extra textarea"
              name="extra-checkbox"
              value={addExtraTextarea}
              onChange={setAddExtraTextarea}
            />
            {addExtraTextarea && (
              <TextareaInput
                label="Testing dynamic adding and removing of input elements:"
                name="form-textarea-extra"
                errorMsg="Some textarea error!"
                validator={(val) => val.length > 0}
                placeholder="Enter your value"
                // initValue="Test"
              />
            )}

            <EmailInput
              label="I want two emails (multiple email input):"
              name="form1-email"
              errorMsg="More email for spam please!"
              validator={validEmailsList(1)}
              placeholder="Enter your value"
              multiple
              // initValue={["test1", "test2"]}
            />
          </FormGroup>

          <FormGroup>
            <FileInput
              label="Select a file (file input):"
              name="form-file"
              errorMsg="Please input a file"
              validator={isLongerThan(0)}
              accept={['.css', '.js']}
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {submitText}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default App;
