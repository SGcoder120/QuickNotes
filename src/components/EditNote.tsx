import React, { useState } from "react";
import { Note } from "../App";
import "./EditNote.css";

interface EditNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function EditNote({ notes, setNotes }: EditNoteProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
  };

  const saveEdit = (index: number) => {
    const updated = [...notes];
    updated[index] = { title: editTitle, content: editContent };
    setNotes(updated);
    setEditingIndex(null);
    setEditTitle("");
    setEditContent("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditContent("");
  };

  const deleteNote = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  return (
    <div>
      <h2>Quick Notes - Edit Notes</h2>
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note-card">
              {editingIndex === index ? (
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
                  <div className="note-actions">
                    <button onClick={() => saveEdit(index)} className="save-button">Save Changes</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                  <div className="note-actions">
                    <button onClick={() => startEdit(index)}>✏️ Edit</button>
                    <button onClick={() => deleteNote(index)}>🗑 Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EditNote;
