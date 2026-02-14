import { useState } from "react";
import "./App.css";

import {
  required,
  minLength,
  email,
  strongPassword,
  createValidator,
  rollNumber,
  phone,
  validDate,
  url
} from "form-validator";

function App() {
  // Validators
  const validateEmail = createValidator(
    required("Email is required"),
    minLength(5, "Email must be at least 5 characters"),
    email("Invalid email format")
  );

  const validatePassword = createValidator(
    required("Password is required"),
    strongPassword(
      "Password must be 8+ chars with uppercase, lowercase, number & special character"
    )
  );

  const validateRoll = createValidator(required("Roll no is required"), rollNumber());
  const validatePhone = createValidator(required("Phone no is required"), phone());
  const validateDate = createValidator(required("Date required"), validDate());
  const validateURL = createValidator(required("URL required"), url());

  // State
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rollValue, setRollValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [rollError, setRollError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Submit handler
  const handleSubmit = () => {
    const emailResult = validateEmail(emailValue);
    const passwordResult = validatePassword(passwordValue);
    const rollResult = validateRoll(rollValue);
    const phoneResult = validatePhone(phoneValue);
    const dateResult = validateDate(dateValue);
    const urlResult = validateURL(urlValue);

    setEmailError(emailResult);
    setPasswordError(passwordResult);
    setRollError(rollResult);
    setPhoneError(phoneResult);
    setDateError(dateResult);
    setUrlError(urlResult);

    if (!emailResult && !passwordResult && !rollResult && !phoneResult && !dateResult && !urlResult) {
      alert("Form submitted successfully!");
      // Optionally reset fields
      setEmailValue("");
      setPasswordValue("");
      setRollValue("");
      setPhoneValue("");
      setDateValue("");
      setUrlValue("");
    }
  };

  return (
    <div className="app-container">
      <h2>Registration Form</h2>

      <input
        type="text"
        placeholder="Enter Email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      {emailError && <p className="error">{emailError}</p>}

      <input
        type="password"
        placeholder="Enter Password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      {passwordError && <p className="error">{passwordError}</p>}

      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollValue}
        onChange={(e) => setRollValue(e.target.value)}
      />
      {rollError && <p className="error">{rollError}</p>}

      <input
        type="date"
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
      />
      {dateError && <p className="error">{dateError}</p>}

      <input
        type="text"
        placeholder="Enter URL"
        value={urlValue}
        onChange={(e) => setUrlValue(e.target.value)}
      />
      {urlError && <p className="error">{urlError}</p>}

      <input
        type="text"
        placeholder="Enter Telephone"
        value={phoneValue}
        onChange={(e) => setPhoneValue(e.target.value)}
      />
      {phoneError && <p className="error">{phoneError}</p>}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
