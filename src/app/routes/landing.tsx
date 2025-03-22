import { Title } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import React from "react";
import { RouteButton } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { Formik, useFormik } from "formik";

interface FormValues {
  name: string;
  id: string;
}

const Landing = () => {
  const placeHolderValues: FormValues = {
    name: "Bogus Binted",
    id: "1234567",
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <RegisterLayout>
      <div className="flex flex-col">
        <Title text="ROCK" />
        <Title text="PAPER" />
        <Title text="SCISSORS" />
        <Title text="TOURNAMENT" />
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Input
          id="name"
          type="text"
          label="First and Last Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder={placeHolderValues.name}
          maxLength={30}
        />
        <Input
          id="id"
          type="number"
          label="Student ID"
          onChange={formik.handleChange}
          value={formik.values.id}
          placeholder={placeHolderValues.id}
          maxLength={7}
        />
        <RouteButton type="submit" text="Submit" link="/register"></RouteButton>
      </form>
    </RegisterLayout>
  );
};

export default Landing;
