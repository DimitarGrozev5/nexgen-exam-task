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
      <Form id={formId} onSubmit={submitHandler}>
        <FormGroup>
          <TextInput
            label="Test text input:"
            name="form-text"
            errorMsg="Some validation error!!"
            validator={(val) => val.length > 0}
            placeholder="Enter your value"
          />

          <EmailInput
            label="Test email input:"
            name="form-email"
            errorMsg="Some email error!"
            validator={(val) => val.length > 0}
            placeholder="Enter your value"
          />

          <PasswordInput
            label="Test password input:"
            name="form-password"
            errorMsg="Some password error!"
            validator={(val) => val.length > 0}
            placeholder="Enter your value"
          />
        </FormGroup>

        <FormGroup>
          <SearchInput
            label="Test search input:"
            name="form-search"
            placeholder="Enter your value"
          />

          <NumberInput
            label="Test number input:"
            name="form-number"
            placeholder="Enter your value"
          />

          <CheckboxInput label="Test checkbox input:" name="form-checkbox" />
        </FormGroup>
        <FormGroup>
          <RadioInput
            label="Test radio input:"
            name="test-radio"
            errorMsg="Some radio error!"
            validator={(val) => !!val}
            options={[
              { val: "1", label: "1_" },
              { val: "2", label: "2_" },
              { val: "3", label: "3_" },
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
      <EmailInput
        label="Test email input:"
        name="form1-email"
        placeholder="Enter your value"
        multiple
        value={multipleEmails}
        onChange={setMultipleEmails}
      />
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
