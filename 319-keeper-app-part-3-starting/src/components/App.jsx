import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setnotes] = useState([]);

  function addItem(title, note) {
    setnotes((prev) => {
      return [
        ...prev,
        {
          title: title,
          note: note,
        },
      ];
    });
  }

  function handleDelete(id) {
    setnotes((prev) => {
      return prev.filter((note, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea additem={addItem} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.note}
            delItem={handleDelete}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
