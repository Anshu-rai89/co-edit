import React from "react";
import Avatar from "boring-avatars";

interface UserProfileProps {
  userName: string;
  avatarUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userName }) => {
  return (
    <div className="user-profile">
      <Avatar size={40} name={userName} variant="marble" />
      <p>{userName}</p>
    </div>
  );
};

export default UserProfile;
