import { useEffect, useState } from "react";

function ContactUs() {
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState("");
  const [phone, changePhone] = useState("");
  const [comments, changeComments] = useState("");
  const [phoneType, changePhoneType] = useState("1");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    //check name
    if (name.length === 0) {
      errors.push("Name must be atleast one letter");
    }

    //check email
    if (!email.includes("@") || !email.includes(".")) {
      errors.push("Invalid email!");
    }

    setValidationErrors(errors);
  }, [name, email]);

  function onSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length !== 0) {
      let string = "";
      validationErrors.forEach((error, index) => {
        if (index !== 0) {
          string += ", ";
        }
        string += error;
      });
      // alert(string);
    } else {
      const contactObj = {
        name,
        email,
        phone,
        phoneType,
        comments,
        submittedOn: new Date(),
      };

      changeName("");
      changeEmail("");
      changePhone("");
      changePhoneType("");
      changeComments("");
      setHasSubmitted(false);

      console.log(contactObj);
    }
  }

  return (
    <div>
      {validationErrors.length > 0 && hasSubmitted && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              changeName(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            onChange={(e) => {
              changeEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => {
              changePhone(e.target.value);
            }}
          />
          <select
            name="phoneType"
            onChange={(e) => changePhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select
            </option>
            <option>Fatmama</option>
            <option>Bigdaddy</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
      <div>
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          name="comments"
          onChange={(e) => changeComments(e.target.value)}
          value={comments}
        />
      </div>
    </div>
  );
}

export default ContactUs;
