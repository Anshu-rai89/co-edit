import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCollaborativeEditing } from "../hooks/useCollaborativeEditing";

interface CollaborativeTextAreaProps {
  userName: string;
}

const CollaborativeTextArea: React.FC<CollaborativeTextAreaProps> = ({
  userName,
}) => {
  const {
    isEditing,
    handleFocus,
    handleBlur,
    handleChange,
    content,
    isLocked,
    users,
    editingUserName,
  } = useCollaborativeEditing(userName);


  return (
    <div className="collaborative-text-area-container">
      <h2>Collaborative Text Editor</h2>
      <div className="users-list">
        <h3>Connected Users:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.userName}>
              {user.userName} {user.userName == editingUserName && "(Editing)"}
            </li>
          ))}
        </ul>
      </div>

      <ReactQuill
        value={content}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        readOnly={isLocked || !isEditing}
        theme="snow"
        placeholder="Start editing here..."
      />
    </div>
  );
};

export default CollaborativeTextArea;
