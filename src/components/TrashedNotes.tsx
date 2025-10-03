import React, { useState, useEffect } from "react";
import { Note } from "../App";
import "./TrashedNotes.css";

interface TrashedNotesProps {
  trashedNotes: Note[];
  setTrashedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const TrashedNotes: React.FC<TrashedNotesProps> = ({
  trashedNotes,
  setTrashedNotes,
  setNotes,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Load from localStorage once on mount
  useEffect(() => {
    const saved = localStorage.getItem("trashedNotes");
    if (saved) {
      try {
        setTrashedNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing trashed notes from storage:", e);
      }
    }
  }, [setTrashedNotes]);

  // Save to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("trashedNotes", JSON.stringify(trashedNotes));
  }, [trashedNotes]);

  const restoreNote = (id: string) => {
    const note = trashedNotes.find((n) => n.id === id);
    if (!note) return;

    setTrashedNotes((prev) => prev.filter((n) => n.id !== id));
    setNotes((prev) => [note, ...prev]); // prepend to notes list
    setSelectedId(null);
  };

  const deleteForever = (id: string) => {
    setTrashedNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedId(null);
  };

  const selectedNote = selectedId
    ? trashedNotes.find((n) => n.id === selectedId)
    : null;

  return (
    <div className="trash-notes-container">
      {/* Left side - list */}
      <div className="notes-list">
        <h3>Trash</h3>
        {trashedNotes.length === 0 ? (
          <p>No notes in trash.</p>
        ) : (
          <div className="scrollable-list">
            {trashedNotes.map((note) => (
              <div
                key={note.id}
                className={`note-card ${
                  note.id === selectedId ? "active" : ""
                }`}
                onClick={() => setSelectedId(note.id)}
              >
                <h4>{note.title || "Untitled"}</h4>
                <p>{note.content.slice(0, 50)}...</p>
                <small>{note.id}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right side - detail panel */}
      <div className="note-editor">
        <h3>Manage Trashed Note</h3>
        {!selectedNote ? (
          <p>Select a note from the left.</p>
        ) : (
          <>
            <h4>{selectedNote.title || "Untitled"}</h4>
            <p>{selectedNote.content}</p>
            <div className="trash-actions">
              <button onClick={() => restoreNote(selectedNote.id)}>♻ Restore</button>
              <button onClick={() => deleteForever(selectedNote.id)}>🗑 Delete Forever</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrashedNotes;
