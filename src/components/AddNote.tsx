import React, { useState } from "react";
import { Note } from "../App";

interface AddNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function AddNote({ notes, setNotes }: AddNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return;
    setNotes([...notes, { title, content }]);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <h2>Quick Notes - New Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <textarea
        placeholder="Add new note here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
      />
      <button onClick={saveNote} className="save-btn">
        Save
      </button>
    </>
  );
}

export default AddNote;
