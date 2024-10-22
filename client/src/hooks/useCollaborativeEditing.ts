/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { setupWebSocket } from '../utils/websocket';

export const useCollaborativeEditing = (userName: string) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [content, setContent] = useState('');
    const [editingUserName, setEditingUserName] = useState('');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [users, setUsers] = useState<{ userName: string; isEditing: boolean }[]>([]);

    useEffect(() => {
        const socket = setupWebSocket(userName);
        setWs(socket);

        // Set up event listeners for the WebSocket
        socket.onmessage = handleMessage;

        // Clean up the connection on unmount
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ event: 'DISCONNECT', userName }));
            }
            socket.close();
        };
    }, [userName]);

    const handleMessage = (message: MessageEvent) => {
        const data = message.data instanceof Blob ? parseBlobData(message.data) : JSON.parse(message.data);
        handleEvent(data);
    };

    const parseBlobData = (blob: Blob): Promise<any> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(JSON.parse(reader.result as string));
            reader.readAsText(blob);
        });
    };

    const handleEvent = (data: any) => {
        const { event, userName: senderUserName, content: newContent, editingUserName: newEditingUserName } = data;

        switch (event) {
            case 'CONNECT':
                handleUserConnect(senderUserName);
                break;
            case 'EDIT':
                if (senderUserName !== userName) handleUserEdit(newContent);
                break;
            case 'LOCK':
                if (senderUserName !== userName) setIsLocked(true);
                break;
            case 'UNLOCK':
                setIsLocked(false);
                break;
            case 'DISCONNECT':
                handleUserDisconnect(senderUserName);
                break;
            default:
                break;
        }

        setEditingUserName(newEditingUserName);
    };

    const handleUserConnect = (senderUserName: string) => {
        setUsers((prevUsers) => [...prevUsers, { userName: senderUserName, isEditing: false }]);
    };

    const handleUserEdit = (newContent: string) => {
        setContent(newContent);
        setIsLocked(true);
    };

    const handleUserDisconnect = (senderUserName: string) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.userName !== senderUserName));
    };

    const handleFocus = () => {
        if (!isLocked) {
            setIsEditing(true);
            ws?.send(JSON.stringify({ event: 'LOCK', userName }));
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
        ws?.send(JSON.stringify({ event: 'UNLOCK', userName }));
    };

    const handleChange = (newContent: string) => {
        setContent(newContent);
        ws?.send(JSON.stringify({ event: 'EDIT', content: newContent, userName }));
    };

    return { users, editingUserName, isEditing, handleFocus, handleBlur, handleChange, content, isLocked };
};