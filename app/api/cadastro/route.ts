import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { usuario, email, senha } = body;

    const usuarioExistente = await prisma.user.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { message: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

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

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erro interno",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}