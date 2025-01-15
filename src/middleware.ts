import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Recupera o token da sessão usando NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Se não houver token (usuário não autenticado), redireciona para a página de login
  if (!token) {
    const url = new URL("/api/auth/signin", req.url); // URL de login do NextAuth
    return NextResponse.redirect(url);
  }

  // Caso o token exista, continua o processamento normalmente
  return NextResponse.next();
}

// Aplica o middleware em todas as rotas (ou customize conforme necessário)
export const config = {
  matcher: "/", // Redireciona na rota raiz ou adicione mais rotas se necessário
};