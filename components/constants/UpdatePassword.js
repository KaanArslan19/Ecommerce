"use client";
import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { VscClose } from "react-icons/vsc";
import { filterFormikErrors } from "../../utils/formikHelpers";
import AuthFormContainer from "../ui/AuthFormContainer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const validationSchema = yup.object().shape({
  password1: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function UpdatePassword({ token, userId }) {
  const router = useRouter();
  const {
    values,
    isSubmitting,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { password1: "", password2: "" },
    validationSchema,
    onSubmit: async (values, actions) => {
      const res = await fetch("/api/users/update-password/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: values.password1, token, userId }),
      });
      const { message, error } = await res.json();
      if (res.ok) {
        toast.success(message);
        router.replace("/auth/sign-in");
      }

      if (!res.ok && error) {
        toast.error(error);
      }
    },
  });

  const errorsToRender = filterFormikErrors(errors, touched, values);

  const { password1, password2 } = values;
  const error = (name) => {
    return errors[name] && touched[name] ? true : false;
  };

  return (
    <AuthFormContainer title="Reset password" onSubmit={handleSubmit}>
      <Input
        name="password1"
        label="Password"
        value={password1}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("password1")}
        type="password"
      />
      <Input
        name="password2"
        label="Confirm Password"
        value={password2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("password2")}
        type="password"
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Reset Password
      </Button>
      <div className="">
        {errorsToRender.map((item) => {
          return (
            <div
              key={item}
              className="space-x-1 flex items-center text-red-500"
            >
              <VscClose className="w-4 h-4" />
              <p className="text-xs">{item}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
