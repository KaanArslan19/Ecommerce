import { profile } from "console";
import nodemailer from "nodemailer";

type profile = { name: string; email: string };

interface EmailOptions {
  profile: profile;
  subject: "verification" | "forget-password" | "password-changed";
  linkUrl?: string;
}

const generateMailTransporter = () => {
  var transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_AUTH_USER,
      pass: process.env.MAILTRAP_AUTH_PASS,
    },
  });
  return transport;
};
const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: profile.email,
    html: `<h1> Please verify your email by clicking on <a href=${linkUrl}>this link</a> </h1>`,
  });
};
const sendForgetPasswordLink = async (profile: profile, linkUrl: string) => {
  const transport = generateMailTransporter();

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: profile.email,
    html: `<h1>Please verify your email by clicking on <a href=${linkUrl}>this link</a> </h1>`,
  });
};
const sendUpdatePasswordConfirmation = async (profile: profile) => {
  const transport = generateMailTransporter();

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: profile.email,
    html: `<h1>Your password is now changed <a href=${process.env.SIGN_IN_URL}>click here </a>to sign in</h1>`,
  });
};
export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;
  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl);
    case "forget-password":
      return sendForgetPasswordLink(profile, linkUrl);
    case "password-changed":
      return sendUpdatePasswordConfirmation(profile);
  }
};
