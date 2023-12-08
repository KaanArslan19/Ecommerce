import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        const { user, error } = await fetch(
          "http://localhost:3000/api/users/signin/route",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        ).then(async (res) => await res.json());

        if (error) return null;
        return { id: user.id, ...user };
      },
    }),
  ];
  const callbacks = {
    async jwt(params) {
      if (params.user) {
        params.token = { ...params.token, ...params.user };
      }
      return params.token;
    },
    async session(params) {
      const user = params.token;
      if (user) {
        params.session.user = {
          ...params.session.user,
          id: user.id,
          name: user.name,
          email: user.email,
          verified: user.verified,
        };
      }
      return params.session;
    },
  };

  return await NextAuth(req, res, {
    providers,
    callbacks,
  });
}
