import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useEffect } from "react";
function CreateArea(props) {
  const [title, setTitle] = useState("");
  const [note, setnote] = useState("");
const [Isclicked,setIsClicked]=useState(false);
  function handleTitleChange(event) {
    const value = event.target.value;

    setTitle(value);
  }

  function handleNoteChange(event) {
    const value = event.target.value;
    setnote(value);
  }
  function handleClick ()
  {
    setIsClicked(true);
  }

useEffect(()=>{
if(props.editItem)
{
setnote(props.editItem.note||"");
setTitle(props.editItem.title||"");
setIsClicked(true);
}
},[props.editItem])


  return (
    <div>
      <form className="create-note"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
       { Isclicked ? 
       <div>
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
        <Zoom in={Isclicked}>
        <Fab
          onClick={() => {
            props.additem(title, note);
            setnote("");
            setTitle("");
          }}
        >
         <AddIcon/>
        </Fab>
        </Zoom>
        </div>
        :
        <div>
        <textarea
          onChange={handleNoteChange}
          name="content"
          placeholder="Take a note..."
          rows="1"
          value={note}
          onClick={handleClick}
        />
        <Fab
          onClick={() => {
            props.additem(title, note);
            setnote("");
            setTitle("");
          }}
        >
         <AddIcon/>
        </Fab>
        </div>
       }
        
      </form>
    </div>
  );
}

export default CreateArea;
