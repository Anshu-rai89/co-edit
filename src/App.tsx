import React from "react";
import './App.css'
import CollaborativeTextArea from "./components/collabrativeTextArea";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <CollaborativeTextArea userId="1"/>
    </div>
  );
};

export default App;
