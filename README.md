# Rock Paper Scissors (RPS)-Tournament

RPS-Tournament is a webapp for hosting a tournament of the classic game of Rock Paper Scissors! It was made with an 8-bit retro design with aggressive red and orange colorscheme. Players will join the tournament on their phones while the hosts will operate the game using the admin page.

<img src="./screenshots/landing.png" width="200" alt="Landing Page">
<img src="./screenshots/play.png" width="200" alt="Play Page">
<img src="./screenshots/dashboard.png" width="200" alt="Dashboard Page">

## Features

- Create Players with 7-digit IDs
- Randomly choosing two contestants to FIGHT
- Rock Paper Scissors Functionality _(obv)_
- End Game screen to show top 3 players and credit to its creators
- _More features are presented within the Frontend and API `README.md` files_

## Setup

### Requirements

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Option 1: Local Host

Install dependencies:

```sh
npm i # npm install but lazier
```

Run app:

```sh
npm run dev # hosts both api and frontend using turbo
```

### Option 2: Remote Host

_later_

## Documentation

- [API](./apps/api/README.md)
- [FrontEnd](./apps/frontend/README.md)

## Tech Stack

- [Typescript](https://www.typescriptlang.org/) as our primary language
- [Turbo](https://turborepo.com/) for automating frontend and API production builds

### Frontend

- [Vite](https://vite.dev/) for creating production builds
- [React](https://react.dev/) for the JS framework
- [Motion](https://motion.dev/) for animations
- [Tailwindcss](https://tailwindcss.com/) for styling
- [Figma](https://www.figma.com/) for creating prototypes of the UI/UX

### API

- [ExpressJS](https://expressjs.com/) for hosting backend
- [SocketIO](https://socket.io/) for communications between Frontend and Backend

## Creators

### Developers

- _Remind me to add these when this becomes a GH Repo_

### Artists

- _Remind me to ask for consent_

## Links

- [Figma Prototype](https://www.figma.com/design/Ixbz0pRqGYFAcqHvRV3AsA/RPS-Tournament?node-id=3002-482&t=R9qBQ1rETZqdCQ0C-1)
