import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {

  try {

    // Recebe os dados enviados pelo frontend
    const body = await request.json();

    const { id, pago } = body;

    // Atualiza apenas o campo pago
    const despesaAtualizada = await prisma.despesa.update({

      where: {
        id: Number(id),
      },

      data: {
        pago,
      },

    });

    return NextResponse.json({
      message: "Status atualizado com sucesso",
      despesa: despesaAtualizada,
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