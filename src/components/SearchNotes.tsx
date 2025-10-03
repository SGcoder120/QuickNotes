import React, { useState } from "react";
import { Note } from "../App";
import "./SearchNotes.css";

interface SearchNotesProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  trashedNotes: Note[];
  setTrashedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function SearchNotes({ notes, setNotes, trashedNotes, setTrashedNotes }: SearchNotesProps) {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const filtered =
    query.trim() === ""
      ? []
      : notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        );

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setNotes(notes.map((n) =>
      n.id === editingId ? { ...n, title: editTitle, content: editContent } : n
    ));
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const moveToTrash = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    setNotes(notes.filter((n) => n.id !== id));
    setTrashedNotes([...trashedNotes, note]);
  };

  return (
    <div className="search-notes-container">
      <h2>Quick Notes - Search</h2>
      <input
        type="text"
        placeholder="Search by title or content..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="title-input"
      />

      <div className="search-results">
        {query.trim() === "" && <p>Please enter a query.</p>}
        {filtered.length === 0 && query.trim() !== "" ? (
          <p>No matching notes found.</p>
        ) : (
          filtered.map((note) => (
            <div key={note.id} className="search-item">
              {editingId === note.id ? (
                <div className="note-editing">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className="note-display">
                  <h4>{note.title}</h4>
                  <h5>Created: {note.id}</h5>
                  <p>{note.content}</p>
                  <button onClick={() => startEdit(note)}>✏️ Edit</button>
                  <button onClick={() => moveToTrash(note.id)}>🗑 Move to Trash</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchNotes;
