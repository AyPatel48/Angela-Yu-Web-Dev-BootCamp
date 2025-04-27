import React from "react";

function Note({heading, text}) {
  return (
    <div className="note">
      <h1>{heading}</h1>
      <p>{text}</p>
    </div>
  );
}

export default Note;
