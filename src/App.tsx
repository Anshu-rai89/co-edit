import React from "react";
import './App.css'
import CollaborativeTextArea from "./components/collabrativeTextArea";
import UserProfile from "./components/userProfile";
import { useUser } from "./hooks/useUser"

const App: React.FC = () => {
    const { userId, username, avatarUrl } = useUser();

  return (
    <div className="app-container">
      <UserProfile username={username} avatarUrl={avatarUrl} />
      <CollaborativeTextArea userId={userId} />
    </div>
  );
};

export default App;
