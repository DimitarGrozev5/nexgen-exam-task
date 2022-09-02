import logo from "./logo.svg";
import "./App.css";
import TextInput from "./components/TextInput";
import { useState } from "react";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PaswordInput";
import SearchInput from "./components/SearchInput";
import NumberInput from "./components/NumberInput";
import CheckboxInput from "./components/CheckboxInput";
import RadioInput from "./components/RadioInput";
import TelInput from "./components/TelInput";

function App() {
  const [val, setVal] = useState("");
  const valHandler = (v) => {
    setVal(v);
  };

  return (
    <div className="App">
      <div>
        <TextInput
          label="Test text input:"
          error="Some validation error!!"
          placeholder="Enter your value"
          value={val}
          onChange={valHandler}
        />
      </div>
      <div>
        <EmailInput
          label="Test email input:"
          error=""
          placeholder="Enter your value"
          value={val}
          onChange={valHandler}
        />
      </div>
      <div>
        <PasswordInput
          label="Test password input:"
          error=""
          placeholder="Enter your value"
          value={val}
          onChange={valHandler}
        />
      </div>
      <div>
        <SearchInput
          label="Test search input:"
          error=""
          placeholder="Enter your value"
          value={val}
          onChange={valHandler}
        />
      </div>
      <div>
        <NumberInput
          label="Test number input:"
          error=""
          placeholder="Enter your value"
          value={val}
          onChange={valHandler}
        />
      </div>
      <div>
        <CheckboxInput
          label="Test checkbox input:"
          value={val}
          onChange={valHandler}
        />
      </div>
      <div>
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
      </div>
      <div>
        <TelInput
          label="Test telephone input:"
          error=""
          placeholder="Enter your value"
          value={val}
          onChange={valHandler}
        />
      </div>
      <form>
        <input type="file" />
        <input type="range" />
        <input type="url" />

        <input type="date" />
        <input type="datetime-local" />
        <input type="month" />
        <input type="time" />
        <input type="week" />

        <input type="color" />
      </form>
    </div>
  );
}

export default App;
