import startDb from "@/lib/db";
import EmailVerificationToken from "@/models/emailVerificationToken";
import UserModel from "@/models/userModel";
import { NewUserRequest } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
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

    const verificationUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${newUser._id}`;
    await sendEmail({
      profile: { name: newUser.name, email: newUser.email },
      subject: "verification",
      linkUrl: verificationUrl,
    });

    return res.json({ message: "Please check your email!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};
export default POST;
