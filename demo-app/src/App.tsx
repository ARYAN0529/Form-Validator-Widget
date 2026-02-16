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
  url,
} from "form-validator";

function App() {
  // ================= Validators =================
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

  const validateRoll = createValidator(
    required("Roll no is required"),
    rollNumber()
  );

  const validatePhone = createValidator(
    required("Phone no is required"),
    phone()
  );

  const validateDate = createValidator(
    required("Date required"),
    validDate()
  );

  const validateURL = createValidator(
    required("URL required"),
    url()
  );

  // ================= States =================
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rollValue, setRollValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const [degree, setDegree] = useState("");
  const [degreeError, setDegreeError] = useState<string | null>(null);

  const [courses, setCourses] = useState<string[]>([]);
  const [courseError, setCourseError] = useState<string | null>(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [rollError, setRollError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  // ================= Checkbox Handler =================
  const handleCourseChange = (course: string) => {
    if (courses.includes(course)) {
      setCourses(courses.filter((c) => c !== course));
    } else {
      setCourses([...courses, course]);
    }
  };

  // ================= Submit =================
  const handleSubmit = () => {
    if (isSubmitting) return;

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

    if (!degree) {
      setDegreeError("Please select degree");
    } else {
      setDegreeError(null);
    }

    if (courses.length === 0) {
      setCourseError("Select at least one course");
    } else {
      setCourseError(null);
    }

    const isValid =
      !emailResult &&
      !passwordResult &&
      !rollResult &&
      !phoneResult &&
      !dateResult &&
      !urlResult &&
      degree &&
      courses.length > 0;

    if (!isValid) return;

    // ✅ Lock button only if valid
    setIsSubmitting(true);

    alert("Form submitted successfully!");

    // Reset form
    // setEmailValue("");
    // setPasswordValue("");
    // setRollValue("");
    // setPhoneValue("");
    // setDateValue("");
    // setUrlValue("");
    // setDegree("");
    // setCourses([]);

    // 🔥 5 second delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 5000);
  };

  return (
    <div>
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

      <h4>Select Degree</h4>

      <label>
        <input
          type="radio"
          value="BTech"
          checked={degree === "BTech"}
          onChange={(e) => setDegree(e.target.value)}
        />
        BTech
      </label>

      <label>
        <input
          type="radio"
          value="BCA"
          checked={degree === "BCA"}
          onChange={(e) => setDegree(e.target.value)}
        />
        BCA
      </label>

      {degreeError && <p className="error">{degreeError}</p>}

      <h4>Select Course</h4>

      <label>
        <input
          type="checkbox"
          checked={courses.includes("CSE")}
          onChange={() => handleCourseChange("CSE")}
        />
        CSE
      </label>

      <label>
        <input
          type="checkbox"
          checked={courses.includes("CSE-AI")}
          onChange={() => handleCourseChange("CSE-AI")}
        />
        CSE-AI
      </label>

      <label>
        <input
          type="checkbox"
          checked={courses.includes("CSE-ML")}
          onChange={() => handleCourseChange("CSE-ML")}
        />
        CSE-ML
      </label>

      {courseError && <p className="error">{courseError}</p>}

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

      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "wait" : "Submit"}
      </button>
    </div>
  );
}

export default App;
