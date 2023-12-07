import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { SignInCredentials } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = (await req.body) as SignInCredentials;
  if (!email || !password)
    return res.json({
      error: "Invalid request, email password is missing!",
    });

  await startDb();
  const user = await UserModel.findOne({ email });
  if (!user)
    return res.json({
      error: "Email/Password mismatch!",
    });

  const pwMatch = await user.comparePassword(password);
  if (!pwMatch)
    return res.json({
      error: "Email/Password mismatch!",
    });

  return res.json({
    user: { id: user._id.toString(), name: user.name, role: user.role },
  });
};
export default POST;
