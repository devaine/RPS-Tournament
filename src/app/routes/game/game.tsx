import React from "react";
import Play from "@/features/rounds/play"
import Waiting from "@/features/rounds/waiting"
import Locate from "@/features/rounds/locate"
import Decision from "@/features/rounds/decision"
import { GameLayout } from "@/components/layouts/game-layout"

const Game = () => {
  const [currentScreen, setCurrentScreen] = useState('waiting')

  return (
    <GameLayout>
      {currentScreen === 'game' && <Play />}
      {currentScreen === 'waiting' && <Waiting />}
      {currentScreen === 'locate' && <Locate />}
      {currentScreen === 'decision' && <Decision />}
    </GameLayout>
  )
}

export default Game;
