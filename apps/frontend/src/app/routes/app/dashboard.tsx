import React, { useEffect, useState } from "react";
import { Title, Heading } from "@/components/ui/text";
import { TextLayout } from "@/components/layouts/text-layout";
import Divider from "@/components/ui/divider";
import { PlayerList } from "@/components/ui/lists";
import type { User } from "@/types/gameAPI";
import { useNavigate } from "react-router";

// Backend Imports
import { socket } from "@/features/socketio/init";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
	const navigate = useNavigate();

	const [contestants, setContestants] = useState<User[]>([])
	const [players, setPlayers] = useState<User[]>([])
	const [losers, setLosers] = useState<User[]>([])

	// NOTE: Emmits upon dashboard launch first before anything else.
	useEffect(() => {
		socket.emit("contestantList", (contestants: User[]) => {
			setContestants(contestants)
		});

		socket.emit("playerList", (players: User[]) => {
			setPlayers(players)
		})

		socket.emit("loserList", (losers: User[]) => {
			setLosers(losers)
		})

	}, [])

	useEffect(() => {
		// NOTE: After emitting, grab all other values upon joining / leaving / disconnecting the event.
		const fetchContestants = (newContestants: User[]) => {
			setContestants(newContestants)
		}

		const fetchPlayers = (newPlayers: User[]) => {
			setPlayers(newPlayers)
		}

		const fetchLosers = (newLosers: User[]) => {
			setLosers(newLosers)
		}

		socket.on("updateContestantList", fetchContestants)
		socket.on("updatePlayerList", fetchPlayers)
		socket.on("updateLoserList", fetchLosers)

		return () => {
			socket.off("updateContestantList", fetchContestants)
			socket.off("updatePlayerList", fetchPlayers)
			socket.off("updateLoserList", fetchLosers)
		}
	}, [contestants, players, losers]);

	return (
		<TextLayout>
			<div className="flex flex-col items-center gap-4 p-4">
				<div>
					<Title text="Dashboard" />
					<Divider />
				</div>
				<div className="flex flex-col gap-4">
					{players.length > 0 ? (
						<PlayerList header="Players in Combat" players={players} />
					) : (
						<Heading text="No Players Found" />
					)}
					{contestants.length > 0 ? (
						<PlayerList header="Contestants Remaining" players={contestants} />
					) : (
						<Heading text="No Contestants Found" />
					)}
					{losers.length > 0 ? (
						<PlayerList header="Lost Contestants" players={losers} />
					) : (
						<Heading text="No Losers Found :D" />
					)}
				</div>
				{localStorage.getItem("status") !== "Loser" && (
					<Button
						text="Back"
						color="background"
						onClick={() => {
							navigate("/");
						}}
					/>
				)}
			</div>
		</TextLayout >
	);
};

export default Dashboard;
