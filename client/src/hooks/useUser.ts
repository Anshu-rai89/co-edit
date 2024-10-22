import { useState } from 'react';
import { generateUsername } from 'unique-username-generator';

export const useUser = () => {
    const [username] = useState(() => generateUsername());
    const [avatarUrl] = useState(() => `https://avatars.dicebear.com/api/identicon/${username}.svg`);

    return {username, avatarUrl };
};