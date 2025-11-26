import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          props.delItem(props.id);
        }}
      >
       <DeleteIcon/>
      </button>
      <button onClick={()=>{
        props.Edit(props.id)
      }}>Edit</button>
    </div>
  );
}

export default Note;
