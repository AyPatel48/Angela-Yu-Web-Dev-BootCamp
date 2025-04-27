import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Provide a title to your new note..."
        />
        { note.title != "" ? <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="What would you like to remember and work on in the future???"
          rows="3"
        /> : null}
        { note.title != "" && note.content != "" ? <Zoom in={true}>
          <Fab onClick={submitNote}><AddIcon /></Fab>
        </Zoom> : null}
      </form>
    </div>
  );
}

export default CreateArea;
