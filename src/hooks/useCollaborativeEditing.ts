import { useState, useEffect } from 'react';
import { setupWebSocket } from '../utils/websocket';

export const useCollaborativeEditing = (userId: string) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [content, setContent] = useState('');

    const [ws, setWs] = useState<WebSocket | null>(null);

    const handleFocus = () => {
        if (isLocked) return;

        setIsEditing(true);
        ws?.send(JSON.stringify({ event: 'LOCK', userId }));
    };

    const handleBlur = () => {
        setIsEditing(false);
        ws?.send(JSON.stringify({ event: 'UNLOCK', userId }));
    };

    const handleChange = (newContent: string) => {
        setContent(newContent);
        ws?.send(JSON.stringify({ event: 'EDIT', content: newContent, userId }));
    };

    useEffect(() => {
        const socket = setupWebSocket();
        setWs(socket);

        socket.onmessage = (message) => {
            const { event, content: newContent, userId: senderId } = JSON.parse(message.data);
            if (event === 'EDIT' && senderId !== userId) {
                setContent(newContent);
            } else if (event === 'LOCK' && senderId !== userId) {
                setIsLocked(true);
            } else if (event === 'UNLOCK') {
                setIsLocked(false);
            }
        };

        return () => socket.close();
    }, [userId]);

    return { isEditing, handleFocus, handleBlur, handleChange, content, isLocked };
};