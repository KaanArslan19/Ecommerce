import startDb from "@/lib/db";
import EmailVerificationToken from "@/models/emailVerificationToken";
import UserModel from "@/models/userModel";
import { NewUserRequest } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import crypto from "crypto";
type ResponseData = {
  message: string;
};
const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const body = req.body as NewUserRequest;
    await startDb();

    const newUser = await UserModel.create({
      ...body,
    });
    const token = crypto.randomBytes(36).toString("hex");
    await EmailVerificationToken.create({
      user: newUser._id,
      token,
    });

    var transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_AUTH_USER,
        pass: process.env.MAILTRAP_AUTH_PASS,
      },
    });
    const verificationUrl = `http://localhost:3000/verify?token=${token}&userId=${newUser._id}`;
    await transport.sendMail({
      from: "verification@nextecom.com",
      to: newUser.email,
      html: `<h1> Please verify your email by clicking on <a href=${verificationUrl}>this link</a> </h1>`,
    });

    return res.json({ message: "Please check your email!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};
export default POST;
