import React from "react";
import { useState } from "react";
import { Title, Heading, Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Dashboard from "@/app/routes/game/dashboard";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import { RegisterLayout } from "@/components/layouts/register-layout";
import type { User } from "@/types/gameAPI";
import { Input } from "@/components/ui/input";
import { Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import * as Yup from "yup";
import type { AdminScreen } from "@/types/gameAPI";

type LoginProps = {
  onSubmit: () => void;
};

const adminCred: User = {
  name: "Admin Gang Admin Gang",
  id: 11235813,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  id: Yup.number().required(),
});

export const Admin = () => {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>("Login");
  return (
    <AnimatePresence mode="wait">
      {currentScreen === "Login" && (
        <LoginScreen onSubmit={() => setCurrentScreen("Admin")} />
      )}
      {currentScreen === "Admin" && <AdminScreen />}
    </AnimatePresence>
  );
};

const LoginScreen = ({ onSubmit }: LoginProps) => {
  return (
    <RegisterLayout>
      <Formik
        initialValues={{ name: "", id: "" }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));

          if (
            values.name === adminCred.name &&
            values.id === String(adminCred.id)
          ) {
            console.log("Admin logged in");
            onSubmit();
          }
        }}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="name"
              type="text"
              label="Admin Username"
              onChange={handleChange}
              value={values.name}
              placeholder={""}
              maxLength={30}
            />
            <Input
              id="id"
              type="password"
              inputMode="numeric" // Added for best compatibility
              label="Admin Password"
              onChange={handleChange}
              value={values.id}
              placeholder={""}
              maxLength={8}
            />
            <div className="p-4">
              <Button type="submit" text="Submit"></Button>
            </div>
          </form>
        )}
      </Formik>
    </RegisterLayout>
  );
};

const AdminScreen = () => {
  /* NOTE: Start not only starts the game but prevents new players from joining */

  return (
    <div className="flex flex-col items-between">
      <div className="text-center">
        <Title text="ROCK PAPER SCISSORS ADMIN" />
      </div>
      <div className="flex min-w-screen gap-8 p-4">
        <div className="flex flex-col basis-1/3 gap-4">
          <Heading text="Management" />
          <div className="flex flex-col gap-2">
            <Text text="Round" />
            <MultiButtonLayout horizontal={true}>
              <Button text="Start Round" onClick={() => { }} />
              <Button text="Fix Tie" onClick={() => { }} />
            </MultiButtonLayout>
            <Text text="Game" />
            <MultiButtonLayout horizontal={true}>
              <Button
                text="Start"
                onClick={() => setLandingScreen("Game Started")}
              />
              <Button text="Pause" onClick={() => { }} />
              <Button text="End" color="background" onClick={() => { }} />
            </MultiButtonLayout>
          </div>
        </div>
        <div className="basis-full">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Admin;
