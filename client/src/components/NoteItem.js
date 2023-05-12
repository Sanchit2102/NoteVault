import React from 'react'
import {toast} from "react-hot-toast"

const NoteItem = (props) => {
    const {updateNote,note,title,description,id,getNotes} = props

    const deleteNote=async()=>{
try {
    const response = await fetch(`http://localhost:3002/api/v1/note/delete-note/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
      });
      const data = await response.json();
      if(data?.success){
        toast.success("Note delete successfully")
        getNotes()
      }

} catch (error) {
    console.log(error)
}
    }

  return (
    <>
         <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title text-center"> {title}</h5>
          <p className="card-text text-center">{description}</p>
          <div className="d-flex justify-content-between">
          <i className="fa-solid fa-trash mx-2" onClick={deleteNote}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NoteItem