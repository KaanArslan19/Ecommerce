"use-client";
import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { VscClose } from "react-icons/vsc";
import AuthFormContainer from "../ui/AuthFormContainer";
import { useFormik } from "formik";
import * as yup from "yup";
import { filterFormikErrors } from "@/utils/formikHelpers";
import { toast } from "react-toastify";
import Link from "next/link";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required!"),
});
const SignUp = () => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema,
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      await fetch("/api/users/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(async (res) => {
        if (res.ok) {
          const { message } = await res.json();
          toast.success(message);
        }
        action.setSubmitting(false);
      });
    },
  });
  const { name, email, password } = values;
  const formErrors = filterFormikErrors(errors, touched, values);
  const error = (name) => {
    return errors[name] && touched[name] ? true : false;
  };

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input
        name="name"
        label="Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={name}
        error={error("name")}
      />
      <Input
        name="email"
        label="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={email}
        error={error("email")}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={password}
        error={error("password")}
      />
      <Button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-primary-color"
      >
        Sign up
      </Button>
      <div className="flex items-center justify-between">
        <Link href="/auth/sign-in">Sign in</Link>
        <Link href="/auth/forget-password">Forget password</Link>
      </div>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div
              key={err}
              className="space-x-1 flex items-center text-red-color"
            >
              <VscClose className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
};

export default SignUp;
