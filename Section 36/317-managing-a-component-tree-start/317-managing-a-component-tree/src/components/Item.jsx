import React, { useState } from "react";

export default function Item({ text }) {
  const [isCrossedOut, setIsCrossedOut] = useState("");

  const style = {
    textDecoration: isCrossedOut ? "line-through" : "none",
    cursor: "pointer",
  };

  return (
    <li style={style} onClick={() => setIsCrossedOut((prev) => !prev)}>
      {text}
    </li>
  );
}
