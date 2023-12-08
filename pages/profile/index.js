import Profile from "@/components/constants/Profile";
import React from "react";
import { getSession, useSession } from "next-auth/react";
import EmailVerificationBanner from "../../components/constants/EmailVerificationBanner";

const ProfilePage = () => {
  const session = useSession();
  return (
    <div className="max-w-screen-xl mx-auto p-4 xl:p-0">
      <EmailVerificationBanner />
      <Profile />
    </div>
  );
};

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
