import React, { useState } from "react";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const value = event.target.value;
    setItem(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setItems((prevItems) => {
      return [...prevItems, item];
    });
    setItem("");
  }

  function renderList() {
    return items.map((item, index) => {
      return <li key={index}>{item}</li>;
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input name="toDo" type="text" onChange={handleChange} value={item} />
        <button type="submit">
          <span>Add</span>
        </button>
      </form>
      <div>
        <ul>{renderList()}</ul>
      </div>
    </div>
  );
}

export default App;
