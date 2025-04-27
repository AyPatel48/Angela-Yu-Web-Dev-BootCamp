import React, { useState } from "react";

function App() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;

    switch (name) {
      case "fName":
        setContact((prevValue) => {
          (fName = value), (lName = prevValue.lName), (email = prevValue.email);
        });
      case "lName":
        setContact((prevValue) => {
          (fName = prevValue.fName), (lName = value), (email = prevValue.email);
        });
      case "email":
        setContact((prevValue) => {
          (fName = prevValue.fName), (lName = prevValue.lName), (email = value);
        });
      default:
        setContact((prevValue) => {
          (fName = prevValue.fName),
            (lName = prevValue.lName),
            (email = prevValue.email);
        });
    }
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p style={{ alignSelf: "center" }}>{contact.email}</p>
      <form>
        <input name="fName" placeholder="First Name" onChange={handleChange} />
        <input name="lName" placeholder="Last Name" onChange={handleChange} />
        <input
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
