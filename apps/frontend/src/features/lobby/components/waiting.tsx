import React from "react";
import { Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { GameLayout } from "@/components/layouts/game-layout";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";

type WaitingProps = {
	leaveOnClick: () => void;
};

function Waiting({ leaveOnClick }: WaitingProps) {
	return (
		<GameLayout>
			<Heading text={"Waiting to enter the ring..."} />
			<MultiButtonLayout>
				<Button text="Go to Dashboard" link="/dashboard" />
				<Button
					text="Leave Game"
					link="/"
					color="background"
					onClick={leaveOnClick}
				/>
			</MultiButtonLayout>
		</GameLayout>
	);
}

export default Waiting;
