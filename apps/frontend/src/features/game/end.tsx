import React from "react";
import { useEffect, useState } from "react";
import { Title, Heading } from "@/components/ui/text";
import Divider from "@/components/ui/divider";
import { TextLayout } from "@/components/layouts/text-layout";
import { PlayerList } from "@/components/ui/lists";
import type { User } from "@/types/gameAPI";

// Backend Imports
import { socket } from "@/features/socketio/init";
import About from "@/app/routes/app/about";

const End = () => {
	const [winners, setWinners] = useState<User[]>([]);

	useEffect(() => {
		const fetchWinners = () => {
			socket.emit("winnerList", (winners: User[]) => {
				setWinners(winners);
			});
		};

		fetchWinners();
	}, [setWinners]);

	return (
		<TextLayout>
			<div className="flex flex-col items-center gap-4 p-4">
				<div>
					<Title text="WINNERS" />
					<Divider />
				</div>
				<div className="flex flex-col gap-4">
					{winners.length > 0 ? (
						<PlayerList header="WINNERS" players={winners} />
					) : (
						<Heading text="Loading Winner Data" />
					)}
				</div>
				<About />
			</div>
		</TextLayout>
	);
};

export default End;
