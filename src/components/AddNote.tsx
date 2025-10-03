import React, { useState } from "react";
import { Note } from "../App";
import "./AddNote.css";

interface AddNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function AddNote({ notes, setNotes }: AddNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = () => {
    if (title.trim() && content.trim()) {
      setNotes([
        { id: Date().toLocaleString(), title, content },
        ...notes,
      ]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="add-note-container">
      <h2>Quick Notes - Add</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
      />
      <button onClick={handleAdd} className="add-btn">Add Note</button>
    </div>
  );
}

export default AddNote;
