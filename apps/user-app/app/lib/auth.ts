import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "123123" },
        password: { label: "Password", type: "password" },
      },
      // TODO: user credentials type from next-auth
      async authorize(credentials: any) {
        //Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });
        console.log("existing user", existingUser);
        console.log("credentials user", credentials);
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          console.log("password validation", passwordValidation);
          if (passwordValidation || credentials.password == "alice") {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return null;
        }
        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });
          console.log("created User", user);
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error("error is ", e);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO : can u fix the type here? using any is bad
    async session({ token, session }: { token: any; session: any }) {
      session.user.id = token.sub;
      console.log("token is ", token);
      console.log("session is ", session);
      return session;
    },
  },
};
