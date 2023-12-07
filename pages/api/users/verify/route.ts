import EmailVerificationToken from "@/models/emailVerificationToken";
import UserModel from "@/models/userModel";
import { EmailVerifyRequest } from "@/types";
import { isValidObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  error: string;
};
const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const { token, userId } = (await req.body) as EmailVerifyRequest;
    if (!isValidObjectId(userId) || !token) {
      return res.status(401).send({
        error: "Invalid request, userId and token is required!",
      });
    }
    const verifyToken = await EmailVerificationToken.findOne({ user: userId });
    if (!verifyToken) {
      return res.status(401).send({
        error: "Invalid token!",
      });
    }
    const isMatched = await verifyToken.compareToken(token);
    if (!isMatched) {
      return res.status(401).send({
        error: "Invalid token, token doesn't match!",
      });
    }
    await UserModel.findByIdAndUpdate(userId, { verified: true });
    await EmailVerificationToken.findByIdAndDelete(verifyToken._id);
    return res.json({ error: "Your email is verified." });
  } catch (error) {
    throw new Error(error);
  }
};
export default POST;
