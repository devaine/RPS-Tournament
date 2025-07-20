# Front End

## Project Structure

- `app/` = application interface (includes [Routes](#routes))

- `components/` = those are tools for `app/`
  - components work independent of features, features rely on components to do things

- `config/` = for easily referencing icons and global variables

- `features/` = functionality, uses tools to serve a purpose for app/

- `hooks/` = context states that are shared across the website
  - normally used for react dom hooks but are just for contexts because we were dumbs

- `styles/` = custom types for each part of the application
  - components, more specifically

- `types/` = for shared types used across the application

## Routes

### Root

- `/` = landing page where players sign up and are locked out when game has stated
- `/not-found` = return home page incase player enters non existent link

### Register

- `/register` = players pick their avatar _(this should've been named something else)_
- `/register/confirm-avatar` = players confirm their avatar, name, and student ID information, allowing them to enter the game

### App

- `/about` = contains information regarding the creators of the website and clubs involved in the event hosted _(might remove later since not needed)_
- `/admin` = **main control panel** for hosts to-
  - start the game
  - end the game
  - start a round
  - remove players
  - see dashboard
- `/dashboard` = displays players, contestants, and losers
- `/game` = **main game screen** where people will play in one of five sub-screens
  - "Lobby" = hub where contestants wait to be picked
  - "Play" = initiates and operates a RPS session between two players
  - "Decision" = displays the victor and loser
  - "End" = displays winners and `/about` information
  - "Ready" = queue before player enters "Play" with other player
- `/tv` = tv screen that shows both competing players and contestants in the bottom of the screen

## Links

- [Figma Prototype](https://www.figma.com/design/Ixbz0pRqGYFAcqHvRV3AsA/RPS-Tournament?node-id=3002-482&t=R9qBQ1rETZqdCQ0C-1)

- Inspired by the [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) project structure.
