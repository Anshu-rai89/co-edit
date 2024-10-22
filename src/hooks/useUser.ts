import { useState } from 'react';
import { generateUsername } from 'unique-username-generator';

export const useUser = () => {
    const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
    const [username] = useState(() => generateUsername());
    const [avatarUrl] = useState(() => `https://avatars.dicebear.com/api/identicon/${username}.svg`);

    return { userId, username, avatarUrl };
};