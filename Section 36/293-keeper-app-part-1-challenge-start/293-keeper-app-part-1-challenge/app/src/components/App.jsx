import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";

export default function App() {
    return (
        <div>
            <Component>
                <Header />
                <Note heading="This is the note title" text="This is the note content"/>
                <Footer />
                {...pageProps}
            </Component>
        </div>
    );
}