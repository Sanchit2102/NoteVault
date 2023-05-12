import React, { useState, useEffect, useRef } from "react";
import AddNote from "./AddNote";
import NoteItem from "../components/NoteItem";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

const Notes = () => {
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "" });
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const getNotes = async (e) => {
    try {
      // API Call  with fetch headers
      const response = await fetch(
        "http://localhost:3002/api/v1/note/users-note",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      setNotes(data?.note);
      if (data?.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((e) => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const updateNote =(currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
   
  };
  const ref = useRef(null);
  const refClose = useRef(null);

  //this is for updation
  const handleUpdate = async(e) => {
    e.preventDefault();
    refClose.current.click();
     try {
      const response = await fetch(
        `http://localhost:3002/api/v1/note/update-note/${note.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title: note.etitle,
            description: note.edescription,
          }),
        }
      );
      const data =await response.json();
      console.log(data)
      if (data?.success) {
        toast.success("Updated Successfully")
        getNotes();
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote getNotes={getNotes} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3 item">
                  <label htmlFor="title" className="form-label">
                    <p>Title</p>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3 item">
                  <label htmlFor="description" className="form-label ">
                    <p>Description</p>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 mx-2">
        <h2>Your Notes</h2>
        
        {notes.length !== 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note._id}
              id={note._id}
              title={note.title}
              description={note.description}
              updateNote={updateNote}
              note={note}
              getNotes={getNotes}
            />
          ))
        ) : (
          <p style={{ fontSize: "32px", textAlign: "center", color: "grey" }}>
            "No Notes to display"
          </p>
        )}
      </div>
    </>
  );
};

export default Notes;
