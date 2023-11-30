import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { NewUserRequest } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
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
    var transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_AUTH_USER,
        pass: process.env.MAILTRAP_AUTH_PASS,
      },
    });

    transport.sendMail({
      from: "verification@nextecom.com",
      to: newUser.email,
      html: `<h1> Please verify your email by clicking on <a href= "http://localhost:3000">this link</a> </h1>`,
    });

    res.status(200).json({ message: "User created successfully" });
    console.log(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};
export default POST;
