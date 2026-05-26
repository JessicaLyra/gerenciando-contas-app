import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
  console.log("🔥 CADASTRO CHAMADO");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  try {
    const body = await request.json();

    const { usuario, email, senha } = body;

    // verifica usuário existente
    const usuarioExistente = await prisma.user.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { message: "Este e-mail já está cadastrado" },
        { status: 400 }
      );
    }

    // hash senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // cria usuário
    await prisma.user.create({
      data: {
        usuario,
        email,
        senha: senhaCriptografada,
      },
    });

    return NextResponse.json({
      message: "Cadastro realizado com sucesso",
    });

  } catch (error) {
    console.error("ERRO REAL:", error);

    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}