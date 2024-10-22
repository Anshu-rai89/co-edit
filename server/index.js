import { WebSocket, WebSocketServer } from "ws";
import http from "http";

const server = http.createServer();
const wss = new WebSocketServer({ server });

const clients = new Map();
let userEditing = "";

// Helper function to broadcast messages to all clients except the sender
const broadcast = (message, sender) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== sender) {
      client.send(message);
    }
  });
};

// Handle a new client connection
const handleConnection = (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.event) {
      case "CONNECT":
        handleUserConnect(ws, data.userName);
        break;
      case "EDIT":
        handleUserEdit(ws, data.content);
        break;
      case "LOCK":
      case "UNLOCK":
        handleLockUnlock(ws, data.event, data.content);
        break;
    }
  });

  ws.on("close", () => {
    handleUserDisconnect(ws);
  });
};

// Handle user connection
const handleUserConnect = (ws, userName) => {
  clients.set(ws, userName);
  console.log(`User connected: ${userName}`);

  ws.send(JSON.stringify({ event: "WELCOME", userName }));

  // Notify other clients of the new connection
  broadcast(
    JSON.stringify({
      event: "CONNECT",
      userName: clients.get(ws),
      editingUserName: userEditing,
    }),
    ws
  );
};

const handleUserEdit = (ws, content) => {
  const userName = clients.get(ws);
  userEditing = userName;

  const broadcastMessage = JSON.stringify({
    event: "EDIT",
    userName,
    content,
    editingUserName: userEditing,
  });

  broadcast(broadcastMessage, ws);
};

const handleLockUnlock = (ws, event, content) => {
  const userName = clients.get(ws);

  const broadcastMessage = JSON.stringify({
    event,
    userName,
    content,
    editingUserName: userEditing,
  });

  broadcast(broadcastMessage, ws);
};

const handleUserDisconnect = (ws) => {
  const userName = clients.get(ws);
  if (userName === userEditing) {
    userEditing = "";
    broadcast(JSON.stringify({ event: "UNLOCK", userName }), ws);
  }
  console.log(`User disconnected: ${userName}`);

  broadcast(JSON.stringify({ event: "DISCONNECT", userName }), ws);
  clients.delete(ws);
};

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});

// Set up the connection event
wss.on("connection", handleConnection);
