import React from "react";
import { Note } from "../App";
import "./ExportNotes.css";

interface ExportNotesProps {
  notes: Note[];
  trashedNotes: Note[];
}

function ExportNotes({ notes, trashedNotes }: ExportNotesProps) {
  const exportNotes = () => {
    const data = {
      activeNotes: notes,
      trashedNotes: trashedNotes,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `quick-notes-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-notes-container">
      <h2>Export Notes</h2>
      <p>You can back up your notes by exporting them as a JSON file.</p>
      <button className="export-btn" onClick={exportNotes}>
        📤 Export Notes
      </button>
    </div>
  );
}

export default ExportNotes;
