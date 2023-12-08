import { useSession } from "next-auth/react";

const useAuth = () => {
  const session = useSession();
  return {
    loading: session.status === "loading",
    loggedIn: session.status === "authenticated",
    isAdmin: true,
    profile: session.data?.user,
  };
};

export default useAuth;
