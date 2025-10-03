import React, { useState } from "react";
import { Note } from "../App";
import "./EditNote.css";

interface EditNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  trashedNotes: Note[];
  setTrashedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function EditNote({
  notes,
  setNotes,
  trashedNotes,
  setTrashedNotes,
}: EditNoteProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setNotes(
      notes.map((n) =>
        n.id === editingId ? { ...n, title: editTitle, content: editContent } : n
      )
    );
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const moveToTrash = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    // Remove from active notes
    setNotes(notes.filter((n) => n.id !== id));

    // Add to top of trashed notes
    setTrashedNotes([note, ...trashedNotes]);

    // If the trashed note was being edited, reset editor
    if (editingId === id) {
      setEditingId(null);
      setEditTitle("");
      setEditContent("");
    }
  };

  return (
    <div className="edit-notes-container">
      <h2>Quick Notes - Edit</h2>

      {notes.length === 0 && <p>No notes available.</p>}

      {editingId ? (
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
          <div className="edit-actions">
            <button onClick={saveEdit}>💾 Save</button>
            <button onClick={() => moveToTrash(editingId)}>🗑 Move to Trash</button>
          </div>
        </div>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="note-card">
            <h4>{note.title || "Untitled"}</h4>
            <h5>Created: {note.id}</h5>
            <p>{note.content}</p>
            <div className="note-actions">
              <button onClick={() => startEdit(note)}>✏️ Edit</button>
              <button onClick={() => moveToTrash(note.id)}>🗑 Move to Trash</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EditNote;
