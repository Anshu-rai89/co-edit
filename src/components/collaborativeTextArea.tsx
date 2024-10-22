import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCollaborativeEditing } from "../hooks/useCollaborativeEditing";

interface CollaborativeTextAreaProps {
  userId: string;
}

const CollaborativeTextArea: React.FC<CollaborativeTextAreaProps> = ({
  userId,
}) => {
  const {
    isEditing,
    handleFocus,
    handleBlur,
    handleChange,
    content,
    isLocked,
  } = useCollaborativeEditing(userId);

  return (
    <div className="collaborative-text-area-container">
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
