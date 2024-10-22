import React from "react";
import './App.css'
import CollaborativeTextArea from "./components/collaborativeTextArea";
import UserProfile from "./components/userProfile";
import { useUser } from "./hooks/useUser"

const App: React.FC = () => {
    const { username: userName, avatarUrl } = useUser();

  return (
    <div className="app-container">
      <UserProfile userName={userName} avatarUrl={avatarUrl} />
      <CollaborativeTextArea userName={userName} />
    </div>
  );
};

export default App;
