import React, { useState } from "react";
import { Note } from "../App";
import "./SearchNotes.css";

interface SearchNotesProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function SearchNotes({ notes, setNotes }: SearchNotesProps) {
  const [query, setQuery] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
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

  const startEdit = (noteIndex: number, note: Note) => {
    setEditingIndex(noteIndex);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = (noteIndex: number) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex] = { title: editTitle, content: editContent };
    setNotes(updatedNotes);
    setEditingIndex(null);
    setEditTitle("");
    setEditContent("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditContent("");
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
          filtered.map((note, index) => {
            const noteIndex = notes.indexOf(note);

            return (
              <div key={index} className="search-item">
                {editingIndex === noteIndex ? (
                  <div className="note-editing">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="edit-input"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="edit-textarea"
                    />
                    <div className="edit-actions">
                      <button onClick={() => saveEdit(noteIndex)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="note-display">
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                    <button onClick={() => startEdit(noteIndex, note)}>
                      ✏️ Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SearchNotes;
