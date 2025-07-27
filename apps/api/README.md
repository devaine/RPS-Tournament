# API

An API created in SocketIO to manage the state of players, their creation, in-game logic and so much more!

## API Structure
- `admin.ts` - Manages players, game status, and getting random players.
- `config.ts` - Grabs given information on hosting and exposes types used for frontend.
- `contestant.ts` - Handles and outputs state of players (join/leave/disconnect) across the application.
- `context.ts` - Manages and handles the initial contexts from the frontend and returns updated values if needed.
- `index.ts` - The main initializer of the backend, handles hosting of the website and contains inital game variables & functions.
- `list.ts` - Handles and sends back lists of players in a given state (Loser, Winner, Contestant, etc.)
- `play.ts` - The determinator for players upon playing Rock-Paper-Scissors, returns player state values.
- `sync.ts` - Waits for 2 players to press the "Ready" button upon Frontend emit, and changes specific socket state.

### Tech Stack

- [ExpressJS](https://expressjs.com/) for hosting backend
- [SocketIO](https://socket.io/) for communications between Frontend and Backend
