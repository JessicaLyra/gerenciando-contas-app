import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  console.log("🔥 CADASTRO INICIOU");

  try {
    const body = await request.json();
    console.log("BODY:", body);

    const { usuario, email, senha } = body;

    console.log("ANTES DO FINDUNIQUE");

    const usuarioExistente = await prisma.user.findUnique({
      where: { email },
    });

    console.log("DEPOIS DO FINDUNIQUE", usuarioExistente);

    if (usuarioExistente) {
      return NextResponse.json(
        { message: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    console.log("ANTES DO HASH");

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    console.log("ANTES DO CREATE");

    await prisma.user.create({
      data: {
        usuario,
        email,
        senha: senhaCriptografada,
      },
    });

    console.log("USER CRIADO");

    return NextResponse.json({
      message: "Cadastro realizado com sucesso",
    });

  } catch (error: any) {
  console.error("🔥 ERRO COMPLETO CADASTRO:");
  console.error(error);
  console.error("STACK:", error?.stack);

  return NextResponse.json(
    {
      message: "Erro interno no servidor",
      error: error?.message,
    },
    { status: 500 }
  );
}