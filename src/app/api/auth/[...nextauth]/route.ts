import NextAuth, { type AuthOptions } from "next-auth"
import KeycloakProvider, { type KeycloakProfile } from "next-auth/providers/keycloak"
import { type JWT } from "next-auth/jwt";
import { OAuthConfig } from "next-auth/providers/oauth";


declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    provider?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || "keycloak_client_id",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "keycloak_client_secret",
      issuer: process.env.KEYCLOAK_ISSUER || "keycloak_url",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token
        token.provider = account.provider
      }
      return token
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      if (token.provider === "keycloak") {
        const issuerUrl = (authOptions.providers.find(p => p.id === "keycloak") as OAuthConfig<KeycloakProfile>).options!.issuer!
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
        logOutUrl.searchParams.set("id_token_hint", token.id_token!)
        await fetch(logOutUrl);
      }
    },
  }
}

// Named exports para cada método HTTP (GET, POST)
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}

export default NextAuth(authOptions)