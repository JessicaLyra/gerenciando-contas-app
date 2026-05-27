import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nome: "asc",
      },
    });

    return NextResponse.json(categorias);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Erro ao buscar categorias",
      },
      {
        status: 500,
      }
    );
  }
}