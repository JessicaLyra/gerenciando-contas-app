import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nome, valor, categoriaId, data, descricao } = body;

    // 🔥 pega token do header/cookie
    const token = request.headers.get("cookie")?.split("token=")[1];

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    // 🔥 decodifica JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = decoded.id;

    await prisma.despesa.create({
      data: {
        nome,
        valor: parseFloat(valor),
        categoriaId: Number(categoriaId),
        data: new Date(data),
        descricao,
        userId, // 🔥 ESSENCIAL
      },
    });

    return NextResponse.json({
      message: "Despesa criada com sucesso",
    });
  } catch (error) {
    console.error("ERRO REAL:", error);

    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}