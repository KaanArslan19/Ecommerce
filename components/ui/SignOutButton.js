import { signOut } from "next-auth/react";

const SignOutButton = ({ children }) => {
  return <div onClick={async () => await signOut()}>{children}</div>;
};

export default SignOutButton;
