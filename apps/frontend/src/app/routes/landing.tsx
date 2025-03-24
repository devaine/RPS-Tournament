import React from "react";
import { Title } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      id: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
    validationSchema: validationSchema,
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
        <Button type="submit" text="Submit" link="/register"></Button>
      </form>
    </RegisterLayout>
  );
};

export default Landing;
