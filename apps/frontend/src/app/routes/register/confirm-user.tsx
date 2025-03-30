import React from "react";
import { Title } from "@/components/ui/text";
import { BackButton, Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Avatar } from "@/components/ui/avatar";

// Backend Imports
import { userData } from "@/config/global"; 
import { socket } from "@/features/socketio/init"



const ConfirmUser = () => {
	/* NOTE: Backend: onClick allows client to connect to socketio server
	* WITH details regarding client a.k.a. name at the very least
	*/
	function connectSocket() {
		socket.emit("join_event", {
			name: userData.name,
			id: userData.id
		})	
	};

  return (
    <RegisterLayout>
      <Title text="Do you want to join with this Name, ID, and Avatar?" />
      <Title text={userData.name} />
      <Title text={String(userData.id)} />
      <Avatar src={userData.avatar!} />
      <div className="flex gap-4">
        <BackButton />
        <Button text="Confirm" link="/game" onClick={connectSocket}></Button>
      </div>
    </RegisterLayout>
  );
};

export default ConfirmUser;
