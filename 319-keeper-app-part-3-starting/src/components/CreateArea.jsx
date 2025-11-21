import React, { useState } from "react";

function CreateArea(props) {
  const [title, setTitle] = useState("");
  const [note, setnote] = useState("");

  function handleTitleChange(event) {
    const value = event.target.value;

    setTitle(value);
  }

  function handleNoteChange() {
    const value = event.target.value;
    setnote(value);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          onChange={handleTitleChange}
          name="title"
          placeholder="Title"
          value={title}
        />
        <textarea
          onChange={handleNoteChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note}
        />
        <button
          onClick={() => {
            props.additem(title, note);
            setnote("");
            setTitle("");
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
