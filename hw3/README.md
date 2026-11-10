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

## API Exercise - Rick and Morty Explorer

**Location:** `rickandmorty/`

A React and Express application using the [Rick and Morty API](https://rickandmortyapi.com/documentation) as an alternative to the REST Countries API.

The application includes four routes:

- `/home` - Displays a welcome message.
- `/characters` - Displays the first 100 characters with their names, images, species, and status.
- `/species` - Groups all characters by species, showing the number of characters and their names.
- `/locations` - Displays the number of locations grouped by type.

The Express backend fetches data from the external API, handles pagination, and processes the results before sending them to the React frontend.

**How to run:**

Start the Express backend:

```bash
cd hw3/rickandmorty
npm install
node server/index.js
```

In a separate terminal, start the React frontend:

```bash
cd hw3/rickandmorty/client
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

Both servers must be running for the application to work.

**Issues encountered:**

The Rick and Morty API occasionally returned HTTP 429 (Too Many Requests), especially when fetching all characters and locations. To reduce repeated requests, the backend uses in-memory caching, a request queue, and limited retries with delays.

## Notes

- All commands above assume the repository root as the starting directory.
- Each project has its own `package.json` and `package-lock.json`.
- Run `npm install` inside each project directory before starting it.
- The Rick and Morty application has separate backend and frontend dependencies.
- The `node_modules/` directories are excluded from Git.
- Stop a running server with `Ctrl + C` in the terminal.
