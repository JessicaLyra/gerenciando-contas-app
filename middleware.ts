import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  // Pega token salvo no cookie
  const token = request.cookies.get("token");

  // Rotas protegidas
  const protectedRoutes = ["/dashboard"];

  // Rotas públicas
  const publicRoutes = ["/login", "/cadastro"];

  const path = request.nextUrl.pathname;

  // Verifica se rota é protegida
  const isProtectedRoute = protectedRoutes.includes(path);

  // Verifica se rota é pública
  const isPublicRoute = publicRoutes.includes(path);

  // Se NÃO tiver token
  // e tentar acessar rota protegida
  if (isProtectedRoute && !token) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Se JÁ estiver logado
  // e tentar acessar login/cadastro
  if (isPublicRoute && token) {

    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

// Define onde middleware funciona
export const config = {
  matcher: [
    "/dashboard",
    "/login",
    "/cadastro",
  ],
};