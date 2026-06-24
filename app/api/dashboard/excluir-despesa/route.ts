import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ------------------------------------------------------------
// EXCLUIR DESPESA
// ------------------------------------------------------------
export async function DELETE(request: Request) {

  try {

    // Recebe os dados enviados pelo frontend
    const body = await request.json();

    // Extrai o ID da despesa
    const { id } = body;

    // Exclui a despesa do banco
    await prisma.despesa.delete({
      where: {
        id: Number(id),
      },
    });

    // Retorna sucesso
    return NextResponse.json({
      message: "Despesa excluída com sucesso",
    });

  } catch (error) {

    console.error(error);

    // Retorna erro caso algo falhe
    return NextResponse.json(
      {
        message: "Erro ao excluir despesa",
      },
      {
        status: 500,
      }
    );

  }

}