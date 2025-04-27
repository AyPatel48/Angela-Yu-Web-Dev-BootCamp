import React, {useState} from "react";

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  function updateTime() {
    setTime(new Date().getTime().toLocaleTimeString());
  }
  
  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
