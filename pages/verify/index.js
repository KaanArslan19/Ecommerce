import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
const VerifyPage = () => {
  const router = useRouter();
  const { token, userId } = router.query;
  useEffect(() => {
    const timer = setTimeout(() => {
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
          router.replace("/");
        }
        if (!res.ok && error) {
          toast.error(error);
        }
      });
      if (!token || !userId || token === "" || userId === "") {
        router.push("/404");
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [token, userId, router]);
  return (
    <div className="text-3xl opacity-70 text-center p-5 animate-pulse">
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
};

export default VerifyPage;
