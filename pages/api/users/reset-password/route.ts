import startDb from "@/lib/db";
import PasswordResetTokenModel from "@/models/passwordResetToken";
import { ResetPasswordRequest } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token, userId } = (await req.body) as ResetPasswordRequest;
    await startDb();
    const resetToken = await PasswordResetTokenModel.findOne({ user: userId });
    if (!resetToken) {
      return res.status(404).send({
        error: "Token not found!",
      });
    }

    const matched = await resetToken.compareToken(token);
    if (!matched) {
      return res.status(401).send({
        error: "Invalid token!",
      });
    }
    return res.json({ message: "Password is initialized!" });
  } catch (error) {
    return res.status(500).json({ error: (error as any).message });
  }
};
export default POST;
