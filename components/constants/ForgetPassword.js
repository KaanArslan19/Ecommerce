import React from "react";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { VscClose } from "react-icons/vsc";
import Link from "next/link";
import AuthFormContainer from "../ui/AuthFormContainer";
import { filterFormikErrors } from "../../utils/formikHelpers";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPassword = () => {
  const {
    values,
    isSubmitting,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const res = await fetch("/api/users/forget-password/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const { message, error } = await res.json();

      if (res.ok) {
        toast.success(message);
      }

      if (!res.ok && error) {
        toast.error(error);
      }
      actions.setSubmitting(false);
    },
  });

  const errorsToRender = filterFormikErrors(errors, touched, values);

  const { email } = values;
  const error = (name) => {
    return errors[name] && touched[name] ? true : false;
  };

  return (
    <AuthFormContainer title="Reset Password" onSubmit={handleSubmit}>
      <Input
        name="email"
        label="Email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error("email")}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Send Link
      </Button>
      <div className="flex items-center justify-between">
        <Link href="/auth/signin">Sign in</Link>
        <Link href="/auth/signup">Sign up</Link>
      </div>
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
};
export default ForgetPassword;
