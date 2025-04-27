import React from "react";

export default function Item({ id, text, onClicked }) {
  return (
    <li
      onClick={() => {
        onClicked(id);
      }}
    >
      {text}
    </li>
  );
}
