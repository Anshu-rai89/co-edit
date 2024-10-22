export const setupWebSocket = (userName: string) => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
        console.log('WebSocket connection established');
        socket.send(JSON.stringify({ event: 'CONNECT', userName }));
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return socket;
};
