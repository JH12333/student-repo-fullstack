# HW3 - Full Stack Frameworks and Libraries

## Tutorials

### 1. React - Tic-Tac-Toe

**Location:** `react/`

A tic-tac-toe game built by following the [official React tutorial](https://react.dev/learn/tutorial-tic-tac-toe).

Features:

- Interactive 3×3 game board
- Alternating X and O turns
- Winner detection
- Move history and time travel

**How to run:**

```bash
cd hw3/react
npm install
npm run dev
```

Open the local URL displayed in the terminal.

### 2. Socket.IO - Chat Application

**Location:** `socketio/`

A real-time chat application built by following the [official Socket.IO tutorial](https://socket.io/get-started/chat).

Features:

- Express HTTP server
- Real-time communication using Socket.IO
- Message broadcasting to all connected clients
- Dynamic message display

**How to run:**

```bash
cd hw3/socketio
npm install
node index.js
```

Open `http://localhost:3000` in your browser.

To test real-time messaging, open the application in two browser tabs or windows and send messages between them.

## Notes

- Each project has its own `package.json` and `package-lock.json`.
- Run `npm install` inside each project directory before starting it.
- The `node_modules/` directories are excluded from Git.
- Stop a running server with `Ctrl + C` in the terminal.
