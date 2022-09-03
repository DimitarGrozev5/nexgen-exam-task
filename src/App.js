import logo from "./logo.svg";
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

function App() {
  const [val, setVal] = useState(new Date());
  const valHandler = (v) => {
    setVal(v);
  };

  const formId = useId();

  return (
    <div className="App">
      <Form id={formId}>
        <FormGroup>
          <TextInput
            label="Test text input:"
            error="Some validation error!!"
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
          />

          <EmailInput
            label="Test email input:"
            error=""
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
          />

          <PasswordInput
            label="Test password input:"
            error=""
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
          />
        </FormGroup>

        <FormGroup>
          <SearchInput
            label="Test search input:"
            error=""
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
          />

          <NumberInput
            label="Test number input:"
            error=""
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
          />

          <CheckboxInput
            label="Test checkbox input:"
            value={val}
            onChange={valHandler}
          />
        </FormGroup>
        <FormGroup>
          <RadioInput
            label="Test radio input:"
            radioName="test-radio"
            options={[
              { val: "1", label: "1_" },
              { val: "2", label: "2_" },
              { val: "3", label: "3_" },
            ]}
            value={val}
            onChange={valHandler}
          />

          <TelInput
            label="Test telephone input:"
            error=""
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
          />

          <DateInput
            label="Test Date input:"
            error=""
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
          />
        </FormGroup>

        <FormGroup>
          <TextareaInput
            label="Test text input:"
            error="Some validation error!!"
            placeholder="Enter your value"
            value={val}
            onChange={valHandler}
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
