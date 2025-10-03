import React, { useState, useEffect } from "react";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import SearchNotes from "./components/SearchNotes";
import TrashNotes from "./components/TrashedNotes";
import "./App.css";

export interface Note {
  id: string;
  title: string;
  content: string;
};

function App() {
  const [activeTab, setActiveTab] = useState<"new" | "edit" | "search" | "trash" >("new");
  const [notes, setNotes] = useState<Note[]>([]);
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);

  // Load from chrome storage
  useEffect(() => {
    chrome.storage.local.get(["notes"], (result) => {
      if (result.notes) setNotes(result.notes);
    });
  }, []);

  // Save to chrome storage
  useEffect(() => {
    chrome.storage.local.set({ notes });
  }, [notes]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={`sidebar-btn ${activeTab === "new" ? "active" : ""}`}
          onClick={() => setActiveTab("new")}
        >
          ➕
        </button>
        <button
          className={`sidebar-btn ${activeTab === "edit" ? "active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          📄
        </button>
        <button
          className={`sidebar-btn ${activeTab === "search" ? "active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          🔍
        </button>
        <button
          className={`sidebar-btn ${activeTab === "trash" ? "active" : ""}`}
          onClick={() => setActiveTab("trash")}
        >
          🗑
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "new" && (
          <AddNote notes={notes} setNotes={setNotes} />
        )}
        {activeTab === "edit" && (
          <EditNote notes={notes} setNotes={setNotes} trashedNotes={trashedNotes} setTrashedNotes={setTrashedNotes}/>
        )}
        {activeTab === "search" && (
          <SearchNotes notes={notes} setNotes={setNotes} trashedNotes={trashedNotes} setTrashedNotes={setTrashedNotes}/>
        )}
        {activeTab === "trash" && (
          <TrashNotes trashedNotes={trashedNotes} setTrashedNotes={setTrashedNotes} setNotes={setNotes} />
        )}
      </div>
    </div>
  );
}

export default App;
