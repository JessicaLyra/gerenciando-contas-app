import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createToken } from "../../../lib/auth";

export async function POST(req: Request) {
  try {
    // Recebe email e senha enviados pelo formulário
    const { email, senha } = await req.json();

    // Procura usuário no banco pelo email
    const usuario = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Se não encontrar usuário
    if (!usuario) {
      return NextResponse.json(
        {
          message: "Email ou senha inválidos",
        },
        {
          status: 401,
        }
      );
    }

    // Compara a senha digitada com a senha criptografada do banco
    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return NextResponse.json(
        {
          message: "Email ou senha inválidos",
        },
        {
          status: 401,
        }
      );
    }

          // Login OK
          // Cria token do usuário
      const token = await createToken({
        id: usuario.id,
        email: usuario.email,
      });

      // Cria cookie de autenticação
      const cookieStore = await cookies();

      cookieStore.set("token", token, {
        httpOnly: true,
        secure: false, // true em produção
        path: "/",
      });

      // Login OK
      return NextResponse.json({
        message: "Login realizado com sucesso",
      });

  } catch (error) {
    console.error("ERRO LOGIN:", error);

    return NextResponse.json(
      {
        message: "Erro interno no servidor",
      },
      {
        status: 500,
      }
    );
  }
}