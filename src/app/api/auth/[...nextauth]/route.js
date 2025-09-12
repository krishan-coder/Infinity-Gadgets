import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/dbconnection";
import User from "@/models/Userschema";
import { compare } from "bcrypt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }

          console.log("Connecting to DB...");
          await connectDB();

          console.log("Finding user:", credentials.email);
          //const user = await User.findOne({ email: credentials.email }).select("+password");
          const user = {
            id:69,
            email:"krishansingh@gmail.com",
            role :'admin',
            password : 'password'
          }

          if (!user) {
            console.log("User not found");
            throw new Error("User not found");
          }

          //const isValid = await compare(credentials.password, user.password);
          const isValid = true;
          if (!isValid) {
            console.log("Invalid password");
            throw new Error("Invalid email or password");
          }

          console.log("User authenticated:", user.email);

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || "No Name",
            role: user.role || "user",
          };
        } catch (err) {
          console.error("Auth error:", err);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
