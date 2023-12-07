import PasswordResetTokenModel from "@/models/passwordResetToken";
import UserModel from "@/models/userModel";
import { ForgetPasswordRequest } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import nodemailer from "nodemailer";
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = (await req.body) as ForgetPasswordRequest;
    console.log(email);
    if (!email) return res.status(401).json({ error: "Invalid email!" });

    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) return res.status(404).json({ error: "User not found!" });

    await PasswordResetTokenModel.findOneAndDelete({ user: user._id });
    const token = crypto.randomBytes(36).toString("hex");

    await PasswordResetTokenModel.create({
      user: user._id,
      token,
    });

    const resetPassLink = `${process.env.PW_RESET_URL}?token=${token}&userId=${user._id}`;

    var transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_AUTH_USER,
        pass: process.env.MAILTRAP_AUTH_PASS,
      },
    });

    await transport.sendMail({
      from: "verification@nextecom.com",
      to: user.email,
      html: `<h1>Click on <a href=${resetPassLink}>this link</a> </h1>`,
    });

    return res.json({ message: "Please check your email!" });
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};
export default POST;
