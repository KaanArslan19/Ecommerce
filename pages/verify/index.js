import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
const VerifyPage = ({ token, userId }) => {
  const router = useRouter();
  useEffect(() => {
    if (!token || !userId || token === "" || userId === "") {
      router.replace("/404");
    }
    fetch("/api/users/verify/route", {
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
        toast.error(error);
      }
      router.replace("/");
    });
  }, [token, userId, router]);
  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
};

export default VerifyPage;

export async function getServerSideProps(context) {
  const { token, userId } = context.query;

  return {
    props: { token, userId },
  };
}
