import React, { useState } from "react";
import Item from "./Item";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });

    setInputText("");
  }

  function handleClick(id) {
    setItems((prevItems) => prevItems.filter((item, index) => index != id));
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item, index) => {
            return (
              <Item
                onClicked={handleClick}
                id={index}
                key={index}
                text={item}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
