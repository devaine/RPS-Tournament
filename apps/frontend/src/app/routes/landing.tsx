import React from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Heading, Title } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import type { User } from "@/types/gameAPI";

// Backend Imports
import { userData } from "@/config/global"; // Global Variables

import type { LandingScreen } from "@/types/gameAPI";

const Landing = () => {
  const [landingScreen, setLandingScreen] = useState<LandingScreen>("Register");

  return (
    <RegisterLayout>
      <div className="flex flex-col">
        <Title text="ROCK" />
        <Title text="PAPER" />
        <Title text="SCISSORS" />
        <Title text="TOURNAMENT" />
      </div>
      <AnimatePresence>
        {landingScreen === "Register" && <RegisterScreen />}
        {landingScreen === "Game Started" && <GameStartedScreen />}
      </AnimatePresence>
    </RegisterLayout>
  );
};

const RegisterScreen = ({ onSubmit }: LoginProps) => {
  const formPlaceHolder: User = {
    name: "Bogos Binted",
    id: 1234567,
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-z ,.'-]+$/i)
      .required(), // Regex for Names (Only Letters)
    id: Yup.string().matches(/^\d*$/, "Only Numbers").required(), // Regex for ID's (Only Numbers)
  });
  return (
    <Formik
      initialValues={{ name: "", id: "" }}
      onSubmit={(values) => {
        // Get Student ID + Name from Formik
        userData.name = values.name;
        userData.id = Number(values.id);

        // Send Information to localStorage
        localStorage.setItem("student_info", JSON.stringify(userData));

        console.log(
          "student information: \n" + localStorage.getItem("student_info"),
        );

        navigate("/register");
      }}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="name"
            type="text"
            label="First and Last Name"
            onChange={handleChange}
            value={values.name}
            placeholder={formPlaceHolder.name}
            maxLength={30}
          />

          {
            // No numbers in name
            /\d/.test(values.name) ? (
              <div className="text-background text-3xl font-jersey-10 text-stroke">
                ERROR: Nice try, no numbers!
              </div>
            ) : null
          }

          {
            // If empty, send error
            errors.name && touched.name ? (
              <div className="text-background text-3xl font-jersey-10 text-stroke">
                ERROR: Fill out your name!
              </div>
            ) : null
          }

          <Input
            id="id"
            type="text"
            inputMode="numeric" // Added for best compatibility
            label="Student ID"
            onChange={handleChange}
            value={values.id}
            placeholder={String(formPlaceHolder.id)}
            maxLength={7}
          />

          {
            // If empty on submission, send error to fill out ID
            errors.id && touched.id ? (
              <div className="text-background text-3xl font-jersey-10 text-stroke">
                ERROR: Fill out your Student ID!
              </div>
            ) : null
          }

          {
            // If values.id is NOT a number on submission, send error to correct
            errors.id && !/^\d*$/.test(values.id) && touched.id ? (
              <div className="text-background text-3xl font-jersey-10 text-stroke">
                ERROR: Not a valid Student ID!
              </div>
            ) : null
          }

          {
            // No letters in id
            /.*[a-zA-Z].*/.test(values.id) ? (
              <div className="text-background text-3xl font-jersey-10 text-stroke">
                ERROR: Nice try, no letters!
              </div>
            ) : null
          }

          {
            // No Symbols in id
            /[-!$%^&*()_+|~=`{}[]:";'<>?,.\/]/.test(values.id) ? (
              <div className="text-background text-3xl font-jersey-10 text-stroke">
                ERROR: Nice try, no symbols!
              </div>
            ) : null
          }

          {
            // No whitespace in id
            /\s{1,}/.test(values.id) ? (
              <div className="text-background text-3xl font-jersey-10 text-stroke">
                ERROR: Nice try, no spaces!
              </div>
            ) : null
          }

          <div className="p-4">
            <Button type="submit" text="Submit" link="/register"></Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

const GameStartedScreen = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading text="The tournament has begun!" />
      <Button text="View Dashboard" link="/game/dashboard" />
    </div>
  );
};

export default Landing;
