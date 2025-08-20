import React, { useState, useEffect } from "react";
import { Note } from "../App";

interface AddNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

function AddNote({ notes, setNotes }: AddNoteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load draft from chrome.storage.local on mount
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(["quicknotes-draft-title", "quicknotes-draft-content"], (result) => {
        if (result["quicknotes-draft-title"] !== undefined) setTitle(result["quicknotes-draft-title"]);
        if (result["quicknotes-draft-content"] !== undefined) setContent(result["quicknotes-draft-content"]);
      });
    }
  }, []);

  // Save draft to chrome.storage.local on every change
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({
        "quicknotes-draft-title": title,
        "quicknotes-draft-content": content,
      });
    }
  }, [title, content]);

  const saveNote = () => {
    if (!title.trim() || !content.trim()) return; // Prevent saving empty notes
    setNotes([{ title, content }, ...notes]);
    setTitle("");
    setContent("");
    // Clear draft from chrome.storage.local
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      chrome.storage.local.remove(["quicknotes-draft-title", "quicknotes-draft-content"]);
    }
  };

  return (
    <div>
      <h2>Quick Notes - New Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <textarea
        placeholder="Add new note here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
      />
      <button onClick={saveNote} className="save-btn">
        Save
      </button>
    </div>
  );
}

export default AddNote;
