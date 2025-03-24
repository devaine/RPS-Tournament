import React from "react";
import { Title } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

interface FormValues {
  name: string;
  id: string;
}

const Landing = () => {
  const placeHolderValues: FormValues = {
    name: "Bogus Binted",
    id: "1234567",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    id: Yup.string().length(7).required(),
  });

  const navigate = useNavigate();

  return (
    <RegisterLayout>
      <div className="flex flex-col">
        <Title text="ROCK" />
        <Title text="PAPER" />
        <Title text="SCISSORS" />
        <Title text="TOURNAMENT" />
      </div>

      <Formik
        initialValues={{ name: "", id: "" }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          navigate("/register");
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
              label="First and Last Name"
              onChange={handleChange}
              value={values.name}
              placeholder={placeHolderValues.name}
              maxLength={30}
            />
            <Input
              id="id"
              type="number"
              label="Student ID"
              onChange={handleChange}
              value={values.id}
              placeholder={placeHolderValues.id}
              maxLength={7}
            />
            <Button type="submit" text="Submit" link="/register"></Button>
          </form>
        )}
      </Formik>
    </RegisterLayout>
  );
};

export default Landing;
