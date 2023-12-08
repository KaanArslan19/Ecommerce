import EmailVerificationToken from "@/models/emailVerificationToken";
import UserModel from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { isValidObjectId } from "mongoose";
import { sendEmail } from "@/lib/email";
import startDb from "@/lib/db";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.url.split("?userId=")[1];
    console.log(userId);
    if (!isValidObjectId(userId))
      return res
        .status(401)
        .json({ error: "Invalid request, user id missing!" });
    await startDb();
    const user = await UserModel.findById(userId);
    if (!user)
      return res
        .status(401)
        .json({ error: "Invalid request, user not found!" });
    if (user.verified)
      return res
        .status(401)
        .json({ error: "Invalid request, user is already verified!" });

    const token = crypto.randomBytes(36).toString("hex");
    await EmailVerificationToken.findOneAndDelete({ user: userId });
    await EmailVerificationToken.create({
      user: userId,
      token,
    });

    const verificationUrl = `${process.env.VERIFICATION_URL}?token=${token}&userId=${userId}`;
    await sendEmail({
      profile: { name: user.name, email: user.email },
      subject: "verification",
      linkUrl: verificationUrl,
    });
    return res.json({ message: "Please check your mail." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Could not verify your email, something went wrong." });
  }
};
export default GET;
