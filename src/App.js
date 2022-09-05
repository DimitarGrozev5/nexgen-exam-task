import "./App.css";
import TextInput from "./components/TextInput";
import { useId, useState } from "react";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PaswordInput";
import SearchInput from "./components/SearchInput";
import NumberInput from "./components/NumberInput";
import CheckboxInput from "./components/CheckboxInput";
import RadioInput from "./components/RadioInput";
import TelInput from "./components/TelInput";
import DateInput from "./components/DateInput";
import TextareaInput from "./components/TextareaInput";
import Form from "./components/Form";
import FormGroup from "./components/FormGroup";
import Button from "./components/Button";
import { useHttpClient } from "./hooks/http-client";
import Modal from "./components/Modal";

function App() {
  const [addExtraTextarea, setAddExtraTextarea] = useState(false);
  const formId = useId();

  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const [msgModal, setMsgModal] = useState(null);

  const submitText = isLoading ? "Loading..." : "Submit";

  const submitHandler = async (data) => {
    await sendRequest.post(
      "https://hookb.in/YVkaKJalYbUQjy0QmeZa",
      data
    );

    setMsgModal("Data is posted");
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
        <h1 className="h1">Enter your profile information</h1>
        <Form id={formId} onSubmit={submitHandler}>
          <FormGroup>
            <TextInput
              label="Name (text input):"
              name="form-text"
              errorMsg="Please enter a value!!"
              validator={(val) => val.length > 0}
              placeholder="First and Last"
              // initValue="Test"
            />

            <EmailInput
              label="Email (email input):"
              name="form-email"
              errorMsg="Please enter a valid email!!"
              validator={(val) => val.length > 0}
              placeholder="email@example.com"
              // initValue="Test"
            />

            <PasswordInput
              label="Password (password input):"
              name="form-password"
              errorMsg="Please enter a password!"
              validator={(val) => val.length > 0}
              placeholder="**********"
              // initValue="Test"
            />

            <PasswordInput
              label="Reenter password:"
              name="form-password-2"
              errorMsg="Passwords don't match!"
              validator={function (val) {
                return this["form-password"] === val;
              }}
              placeholder="**********"
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
              validator={(val) => !!val}
              options={[
                { val: "ok", label: "OK" },
                { val: "no", label: "No" },
                { val: "maybe", label: "Maybe later" },
              ]}
              // initValue="no"
            />

            <TelInput
              label="Give me your telephone (tel input):"
              name="form-tel"
              errorMsg="Invalid phone!"
              validator={(val) => val.length > 0}
              placeholder="088 123 1234"
              // initValue="Test"
            />

            <DateInput
              label="Date of birth (date input):"
              name="form-date"
              errorMsg="Please enter date!"
              validator={(val) => !!val}
              // initValue={new Date()}
            />
          </FormGroup>

          <FormGroup>
            <TextareaInput
              label="What's on your mind? (textarea):"
              name="form-textarea"
              errorMsg="Some textarea error!"
              validator={(val) => val.length > 0}
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
              validator={(val) => val.length > 1}
              placeholder="Enter your value"
              multiple
              // initValue={["test1", "test2"]}
            />
          </FormGroup>
          <Button type="submit" disabled={isLoading}>
            {submitText}
          </Button>
        </Form>

        {/* <form>
        <input type="file" />
        <input type="range" />
        <input type="url" />

        <input type="datetime-local" />
        <input type="month" />
        <input type="time" />
        <input type="week" />

        <input type="color" />
      </form> */}
      </div>
    </>
  );
}

export default App;
