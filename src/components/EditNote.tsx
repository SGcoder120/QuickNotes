import React, { useState } from "react";
import { Note } from "../App";
import "./EditNote.css";

interface EditNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function EditNote({ notes, setNotes }: EditNoteProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
  };

  const saveEdit = () => {
    if (editIndex === null) return;
    const updated = [...notes];
    updated[editIndex] = { title: editTitle, content: editContent };
    setNotes(updated);
    setEditIndex(null);
    setEditTitle("");
    setEditContent("");
  };

  const deleteNote = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  return (
    <div>
      <h2>Quick Notes - Edit Notes</h2>

      {editIndex === null ? (
        <div className="notes-list">
          {notes.length === 0 ? (
            <p>No notes yet.</p>
          ) : (
            notes.map((note, index) => (
              <div key={index} className="note-card">
                <h4>{note.title}</h4>
                <p>{note.content}</p>
                <div className="note-actions">
                  <button onClick={() => startEdit(index)}>✏️ Edit</button>
                  <button onClick={() => deleteNote(index)}>🗑 Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="title-input"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="note-textarea"
          />
          <button onClick={saveEdit} className="save-btn">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default EditNote;
