import React, { useState } from "react";
import { Note } from "../App";
import "./TrashedNotes.css";

interface TrashNotesProps {
  trashedNotes: Note[];
  setTrashedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function TrashedNotes({ trashedNotes, setTrashedNotes, setNotes }: TrashNotesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const restoreNote = (id: string) => {
    const note = trashedNotes.find((n) => n.id === id);
    if (!note) return;

    setTrashedNotes(trashedNotes.filter((n) => n.id !== id));
    setNotes((prev) => [...prev, note]);
    setSelectedId(null);
  };

  const deleteForever = (id: string) => {
    setTrashedNotes(trashedNotes.filter((n) => n.id !== id));
    setSelectedId(null);
  };

  return (
    <div className="trash-notes-container">
      <div className="notes-list">
        <h3>Trash</h3>
        {trashedNotes.length === 0 ? (
          <p>No notes in trash.</p>
        ) : (
          trashedNotes.map((note) => (
            <div
              key={note.id}
              className={`note-card ${note.id === selectedId ? "active" : ""}`}
              onClick={() => setSelectedId(note.id)}
            >
              <h4>{note.title || "Untitled"}</h4>
              <p>{note.content.slice(0, 50)}...</p>
            </div>
          ))
        )}
      </div>

      <div className="note-editor">
        <h3>Manage Trashed Note</h3>
        {selectedId === null ? (
          <p>Select a note from the left.</p>
        ) : (
          <>
            <h4>{trashedNotes.find((n) => n.id === selectedId)?.title}</h4>
            <p>{trashedNotes.find((n) => n.id === selectedId)?.content}</p>
            <div className="trash-actions">
              <button onClick={() => restoreNote(selectedId)}>♻ Restore</button>
              <button onClick={() => deleteForever(selectedId)}>🗑 Delete Forever</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TrashedNotes;
