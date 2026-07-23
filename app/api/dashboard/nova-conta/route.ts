import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nome, valor, categoriaId, data, descricao } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    await prisma.despesa.create({
      data: {
        nome,
        valor: Number(valor),
        categoriaId: Number(categoriaId),
        data: new Date(data),
        descricao,
        userId,
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