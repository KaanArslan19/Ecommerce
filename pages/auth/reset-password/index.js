import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { toast } from "react-toastify";
import UpdatePassword from "../../../components/constants/UpdatePassword";

const ResetPasswordPage = ({ token, userId }) => {
  const router = useRouter();
  useEffect(() => {
    if (!token || !userId || token === "" || userId === "") {
      router.push("/404");
    }
    fetch("/api/users/reset-password/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, userId }),
    }).then(async (res) => {
      const { error, message } = await res.json();
      if (res.ok) {
        toast.success(message);
      }
      if (!res.ok && error) {
        router.replace("/404");
      }
    });
  }, [token, userId, router]);
  return <UpdatePassword token={token} userId={userId} />;
};

export default ResetPasswordPage;

export async function getServerSideProps(context) {
  const { token, userId } = context.query;

  return {
    props: { token, userId },
  };
}
