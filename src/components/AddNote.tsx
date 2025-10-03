import React, { useState, useEffect } from "react";
import { Note } from "../App";
import "./AddNote.css";

interface AddNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function AddNote({ notes, setNotes }: AddNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load draft when component mounts
  useEffect(() => {
    const savedDraft = localStorage.getItem("draftNote");
    if (savedDraft) {
      const { title, content } = JSON.parse(savedDraft);
      setTitle(title || "");
      setContent(content || "");
    }
  }, []);

  // Save draft whenever title or content changes
  useEffect(() => {
    localStorage.setItem("draftNote", JSON.stringify({ title, content }));
  }, [title, content]);

  // Format timestamp as mm/dd/yyyy hh:mm:ss (24h) UTC
  const formatDateUTC = (date: Date) => {
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const min = String(date.getUTCMinutes()).padStart(2, "0");
    const sec = String(date.getUTCSeconds()).padStart(2, "0");
    return `${mm}/${dd}/${yyyy} ${hh}:${min}:${sec} UTC`;
  };

  const handleAdd = () => {
    if (title.trim() && content.trim()) {
      const now = new Date();
      const formattedDate = formatDateUTC(now);

      setNotes([
        { id: formattedDate, title, content },
        ...notes,
      ]);

      // Clear inputs
      setTitle("");
      setContent("");

      // Clear draft
      localStorage.removeItem("draftNote");
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
        className="note-title-input"
      />
      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
      />
      <button onClick={handleAdd} className="add-btn">
        Add Note
      </button>
    </div>
  );
}

export default AddNote;
