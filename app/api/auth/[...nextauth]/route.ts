import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        senha: {},
      },
      async authorize(credentials) {
        // Simulação (igual antes)
        if (
          credentials?.email === "admin@email.com" &&
          credentials?.senha === "123456"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: credentials.email,
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: "secreta-super",
});

export { handler as GET, handler as POST };