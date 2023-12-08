import PasswordResetTokenModel from "@/models/passwordResetToken";
import UserModel from "@/models/userModel";
import { ForgetPasswordRequest } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = (await req.body) as ForgetPasswordRequest;
    if (!email) return res.status(401).json({ error: "Invalid email!" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    await PasswordResetTokenModel.findOneAndDelete({ user: user._id });
    const token = crypto.randomBytes(36).toString("hex");

    await PasswordResetTokenModel.create({
      user: user._id,
      token,
    });

    const resetPassLink = `${process.env.PW_RESET_URL}?token=${token}&userId=${user._id}`;
    await sendEmail({
      profile: { name: user.name, email: user.email },
      subject: "forget-password",
      linkUrl: resetPassLink,
    });

    return res.json({ message: "Please check your email!" });
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};
export default POST;
