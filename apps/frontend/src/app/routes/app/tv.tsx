import React from "react";
import { useEffect, useState } from "react";
import { TVLayout } from "@/components/layouts/tv-layout";
import { Announce } from "@/components/ui/text";
import type { User } from "@/types/gameAPI";
import { Player, EmptyPlayer } from "@/components/ui/player";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { PlayerList } from "@/components/ui/lists";

/* NOTE: PSUEDOCODE BECAUSE IDK WHAT I'M DOING
 *
 * Goals of this page:
 * 1. Display the two players in the game
 * 2. Display the contestants watching the game
 * 3. Display countdown once game starts (get to potentially)
 * 4. Display the choices of the players and which choice they selected (get to potentially)
 * TODO: 5. Display the results of the game once game is finished
 * 6. Reset the game
 *
 * How to achieve these goals:
 *
 * For 5,
 * */

const TV = () => {
	const [players, setPlayers] = useState<User[]>([]);
	const [contestants, setContestants] = useState<User[]>([]);

	useEffect(() => {
		socket.emit("contestantList", (contestants: User[]) => {
			setContestants(contestants)
		});

		socket.emit("playerList", (players: User[]) => {
			setPlayers(players)
		})

	}, [])

	useEffect(() => {
		const fetchContestants = (newContestants: User[]) => {
			setContestants(newContestants)
		}

		const fetchPlayers = (newPlayers: User[]) => {
			setPlayers(newPlayers)
		}

		socket.on("updateContestantList", fetchContestants)
		socket.on("updatePlayerList", fetchPlayers)

		return () => {
			socket.off("updateContestantList", fetchContestants)
			socket.off("updatePlayerList", fetchPlayers)
		}
	}, [contestants, players]);




	return (
		<div className="flex flex-col h-min-screen justify-evenly">
			<TVLayout>
				{players.length > 0 ? <Player {...players[0]} /> : <EmptyPlayer />}
				<Announce text="VS" />
				{players.length > 0 ? <Player {...players[1]} /> : <EmptyPlayer />}
			</TVLayout>
			<PlayerList header="Spectators" players={contestants} />
		</div>
	);
};

export default TV;
