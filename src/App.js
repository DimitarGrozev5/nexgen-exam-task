import "./App.css";
import TextInput from "./components/TextInput";
import { useId, useRef, useState } from "react";
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

function App() {
  const [addExtraTextarea, setAddExtraTextarea] = useState(false);
  const [multipleEmails, setMultipleEmails] = useState([]);
  const formId = useId();

  const submitHandler = (data) => {
    fetch(
      "https://www.toptal.com/developers/postbin/1662293684099-0788799582514",
      {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  };

  return (
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
          />

          <EmailInput
            label="Email (email input):"
            name="form-email"
            errorMsg="Please enter a valid email!!"
            validator={(val) => val.length > 0}
            placeholder="email@example.com"
          />

          <PasswordInput
            label="Password (password input):"
            name="form-password"
            errorMsg="Please enter a password!"
            validator={(val) => val.length > 0}
            placeholder="**********"
          />

          <PasswordInput
            label="Reenter password:"
            name="form-password-2"
            errorMsg="Passwords don't match!"
            validator={function (val) {
              return this["form-password"] === val;
            }}
            placeholder="**********"
          />
        </FormGroup>

        <FormGroup>
          <SearchInput
            label="Type a query (search input):"
            name="form-search"
            placeholder="Start typing..."
          />

          <NumberInput
            label="Enter a number (number input):"
            name="form-number"
            placeholder="Enter your value"
          />

          <CheckboxInput label="Check this box! (checkbox input)" name="form-checkbox" />
        </FormGroup>
        <FormGroup>
          <RadioInput
            label="Select one of these options!:"
            name="test-radio"
            errorMsg="Some radio error!"
            validator={(val) => !!val}
            options={[
              { val: "ok", label: "OK" },
              { val: "no", label: "No" },
              { val: "maybe", label: "Maybe later" },
            ]}
          />

          <TelInput
            label="Test telephone input:"
            name="form-tel"
            errorMsg="Some tel error!"
            validator={(val) => val.length > 0}
            placeholder="Enter your value"
          />

          <DateInput
            label="Test Date input:"
            name="form-date"
            errorMsg="Some date error!"
            validator={(val) => !!val}
            placeholder="Enter your value"
          />
        </FormGroup>

        <FormGroup>
          <TextareaInput
            label="Test text input:"
            name="form-textarea"
            errorMsg="Some textarea error!"
            validator={(val) => val.length > 0}
            placeholder="Enter your value"
          />
          <CheckboxInput
            label="Add an extra textarea"
            name="extra-checkbox"
            value={addExtraTextarea}
            onChange={setAddExtraTextarea}
          />
          {addExtraTextarea && (
            <TextareaInput
              label="Test text 2 input:"
              name="form-textarea-extra"
              errorMsg="Some textarea error!"
              validator={(val) => val.length > 0}
              placeholder="Enter your value"
            />
          )}

          <EmailInput
            label="Test email input:"
            name="form1-email"
            errorMsg="Some email error!"
            validator={(val) => val.length > 0}
            placeholder="Enter your value"
            multiple
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
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
  );
}

export default App;
