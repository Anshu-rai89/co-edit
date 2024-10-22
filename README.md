
# Collaborative Text Editor

A real-time collaborative text editor built with WebSocket and React, allowing multiple users to collaborate with one user editing at a time and others seeing updates in real-time.

## Features

- Real-time collaborative editing
- User presence indicator
- Locking mechanism to prevent concurrent edits
- Automatic updates to all connected clients

## External Libraries

- **React**: For building the user interface
- **Quill**: A rich text editor for enhanced editing experience
- **ws**: A WebSocket library for Node.js
- **Node.js**: JavaScript runtime for building server-side applications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd collaborative-text-editor
   ```

2. **Install server dependencies**

   Navigate to the server directory and install the required packages:

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   Navigate to the client directory and install the required packages:

   ```bash
   cd client
   npm install
   ```

4. **Run the server**

   Navigate back to the server directory and start the WebSocket server:

   ```bash
   cd server
   npm start
   ```

5. **Run the client**

   Open a new terminal window, navigate to the client directory, and start the React application:

   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**

   Open your browser and go to `http://localhost:5173`. You can open multiple tabs or browsers to test the collaborative editing feature.
