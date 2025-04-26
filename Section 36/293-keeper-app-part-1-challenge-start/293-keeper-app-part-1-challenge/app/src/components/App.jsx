import React from "react";
import Header from "../../../../293-keeper-app-part-1-challenge-start/293-keeper-app-part-1-challenge/app/src/components/Header";
import Note from "../../../../293-keeper-app-part-1-challenge-start/293-keeper-app-part-1-challenge/app/src/components/Note";
import Footer from "../../../../293-keeper-app-part-1-challenge-start/293-keeper-app-part-1-challenge/app/src/components/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <Note heading="This is the note title" text="This is the note content" />
      <Footer />
    </div>
  );
}
