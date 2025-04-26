import React from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <Note heading="This is the note title" text="This is the note content" />
      <Footer />
    </div>
  );
}
