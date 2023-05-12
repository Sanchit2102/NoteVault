import React, { useState } from 'react'
import {toast} from "react-hot-toast"

const AddNote = (props) => {
  const {getNotes} =props;
    const [note,setNotes] =useState({title: "", description: ""})
   
        const onChange = (e) => {
            setNotes({ ...note, [e.target.name]: e.target.value }); 
          };
    
          const handleSubmit =async(e)=>{
            e.preventDefault();
            try {
                const response = await fetch("http://localhost:3002/api/v1/note/create-note", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      "auth-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify({title:note.title, description:note.title})
                  });
                  const data = await response.json()
                if(data?.success){
                 setNotes(data?.note)
                 toast.success("note created succefully")

                 getNotes()
                }

            } catch (error) {
                console.log(error)
            }
          }

  return (
   <>
    <div className="container box" >
      <h1 id="heading">Make a note</h1>
      </div>
      <div className="box">
      <form className="my-2" onSubmit={handleSubmit}>
        <div className="mb-3 item">
          <label htmlFor="title" className="form-label" >
            <p>Title</p>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            minLength={5} required
            onChange={onChange}
          />
        </div>
        <div className="mb-3 item">
          <label htmlFor="description" className="form-label ">
          <p>Description</p>
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            minLength={5} required
            onChange={onChange}
          />
        </div>
        <div className=" d-flex justify-content-end" >
        <button
         disabled ={note.title.length<5 || note.description.length<5} 
         type="submit" className="add">
        <i className="fa-duotone fa-plus " ></i>
        </button>
        </div>
      </form>
      </div>
   </>
  )
}

export default AddNote