import React from "react";
import Avatar from "boring-avatars";

interface UserProfileProps {
  username: string;
  avatarUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
  return (
    <div className="user-profile">
      <Avatar size={40} name={username} variant="marble" />
      <p>{username}</p>
    </div>
  );
};

export default UserProfile;
