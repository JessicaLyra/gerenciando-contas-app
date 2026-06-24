import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {

  try {

    const body = await request.json();

    const {
      id,
      nome,
      valor,
      categoriaId,
      data,
      descricao,
    } = body;

    const despesa = await prisma.despesa.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        valor,
        categoriaId: Number(categoriaId),
        data: new Date(data),
        descricao,
      },
    });

    return NextResponse.json({
      message: "Despesa atualizada com sucesso",
      despesa,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Erro ao atualizar despesa",
      },
      {
        status: 500,
      }
    );

  }

}