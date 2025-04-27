import React from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";
import notes from "./notes"

export default function App() {
  return (
    <div>
      <Header />
      {
        notes.map((note) => (
          <Note key={note.key} heading={note.title} text={note.content} />
        ))
      }
      <Footer />
    </div>
  );
}
