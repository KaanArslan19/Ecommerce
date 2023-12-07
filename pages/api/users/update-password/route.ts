import startDb from "@/lib/db";
import PasswordResetTokenModel from "@/models/passwordResetToken";
import UserModel from "@/models/userModel";
import { ForgetPasswordRequest, UpdatePasswordRequest } from "@/types";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { password, token, userId } =
      (await req.body) as UpdatePasswordRequest;

    console.log(password, token, userId);
    if (!password || !token || !isValidObjectId(userId))
      return res.status(401).json({ error: "Invalid request!" });

    await startDb();
    const resetToken = await PasswordResetTokenModel.findOne({ user: userId });
    if (!resetToken) {
      return res.status(404).send({
        error: "Unauthorized request!",
      });
    }

    const matched = await resetToken.compareToken(token);
    if (!matched) {
      return res.status(401).send({
        error: "Unauthorized request!",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        error: "User not found!",
      });
    }
    const isMatched = await user.comparePassword(password);
    if (isMatched) {
      return res.status(401).send({
        error: "New Password must be different!",
      });
    }
    user.password = password;
    await user.save();

    await PasswordResetTokenModel.findByIdAndDelete(resetToken._id);

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
      html: `<h1>Your password is now changed. </h1>`,
    });

    return res.json({ message: "Your password is now changed." });
  } catch (error) {
    return res.status(500).json({
      error: "could not update password, something went wrong!",
    });
  }
};
export default POST;
