import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";


function App() {
  const [notes, setnotes] = useState([]);
  const[data,setdata]=useState();
  const[editValue,seteditValue]=useState(false)


useEffect(() =>
{

  const fetchNotes =() => {
let isMounted=true;
  fetch("http://localhost:5000").then(
    response =>response.json()

  ).then((comingdata)=>{
    
    if(isMounted)
    {
    setnotes(comingdata)}})
  }
  
  fetchNotes();


  const Refresh= setInterval(fetchNotes,2000);

  return () => {

    isMounted=false;
    clearInterval(Refresh)
  
  };
    
  
}, [])
 


  function addItem(title, note) {

   if(editValue)
     {
      const editdata={id:data.id,title,note}

 fetch(`http://localhost:5000/${data.id}`,{
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(editdata), 
    }).then(res=>res.json()).then((response)=>{
      setnotes((prev)=>
       prev.map(n=> (n.id ===data.id ? editdata:n))
      )
       console.log("server response",response);
    })
     
    
    seteditValue(false);
    setdata(null);
return;
  }
    const id = notes.length +1;
const Newdata = {id,title,note}
    fetch("http://localhost:5000",{
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(Newdata), 
    }).then(res=>res.json()).then(response =>{
      console.log("server response",response)
    })



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

fetch(`http://localhost:5000/${id}`,{

  method:"DELETE"
})

    setnotes((prev) => {
      return prev.filter((note, index) => {
        return index !== id;
      });
    });
  }


//handle the edit functionality

function handleEdit (id)
{
 setdata( notes.find(note=>note.id===id));

 seteditValue(true);



}


  return (
    <div>
      <Header />
      {/* {data.map((data,index)=>{
       return <p key={index}>{data.title}</p>
      }
    )} */}

  
      <CreateArea additem={addItem} editItem={data} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note.id}
            title={note.title}
            content={note.note}
            delItem={handleDelete}
            Edit={handleEdit}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
