import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CollaborativeTextAreaProps {
  userId: string;
}

const CollaborativeTextArea: React.FC<CollaborativeTextAreaProps> = () => {
  return (
    <div className="collaborative-text-area-container">
      <ReactQuill value={""} theme="snow" placeholder="Start editing here..." />
    </div>
  );
};

export default CollaborativeTextArea;
