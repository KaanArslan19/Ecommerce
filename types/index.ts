export interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface EmailVerifyRequest {
  token: string;
  userId: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  userId: string;
}

export interface UpdatePasswordRequest {
  password: string;
  token: string;
  userId: string;
}
export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  verified: boolean;
}
