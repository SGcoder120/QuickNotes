import React, { useState } from "react";
import { Note } from "../App";
import "./SearchNotes.css";

interface SearchNotesProps {
  notes: Note[];
}

function SearchNotes({ notes }: SearchNotesProps) {
  const [query, setQuery] = useState("");

  const filtered =
    query.trim() === ""
      ? []
      : notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase())
        );

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
        {query.trim() === "" && (
          <p>Please enter a query.</p>
        )}
        {filtered.length === 0 && query.trim() !== "" ? (
          <p>No matching notes found.</p>
        ) : (
          filtered.map((note, index) => (
            <div key={index} className="search-item">
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchNotes;
