import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
const EmailVerificationBanner = () => {
  const { profile } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  if (profile?.verified) return null;
  const applyForReVerification = async () => {
    if (!profile) return;

    setSubmitting(true);
    const res = await fetch(
      "/api/users/reverification/route?userId=" + profile?.id,
      {
        method: "GET",
      }
    );

    const { message, error } = await res.json();
    if (!res.ok && error) {
      toast.error(error);
    }
    toast.success(message);
    setSubmitting(false);
  };
  return (
    <div className="p-2 text-center bg-primary-color-light">
      <span> It looks like you haven't verified your email.</span>
      <button
        onClick={applyForReVerification}
        disabled={submitting}
        className="ml-2 font-semibold underline"
      >
        {submitting ? "Genarating link.." : "Get verification link"}{" "}
      </button>
    </div>
  );
};

export default EmailVerificationBanner;
