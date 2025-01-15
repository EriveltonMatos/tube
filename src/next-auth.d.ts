import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    idToken?: string; // Adiciona o idToken à sessão
  }

  interface JWT {
    provider: string;
    idToken?: string; // Adiciona o idToken ao token JWT
  }
}