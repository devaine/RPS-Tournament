import React from "react";
import { Heading, Title } from "@/components/ui/text";
import { BackButton, Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Avatar } from "@/components/ui/avatar";

// Backend Imports
import { userData } from "@/config/global";
import { socket } from "@/features/socketio/init";

const ConfirmUser = () => {
  return (
    <RegisterLayout>
      <Title text="Ready to join?" />
      <Heading text={userData.name} />
      <Heading text={String(userData.id)} />
      <Avatar src={userData.avatar!} />
      <div className="flex gap-4">
        <BackButton />
        <Button text="Yes" link="/game" onClick={connectSocket}></Button>
      </div>
    </RegisterLayout>
  );
};

function connectSocket() {
  /* NOTE: Backend: onClick allows client to connect to socketio server
   * WITH details regarding client a.k.a. name at the very least
   */
  socket.emit("join_event", {
    name: userData.name,
    id: userData.id,
  });
}

export default ConfirmUser;
