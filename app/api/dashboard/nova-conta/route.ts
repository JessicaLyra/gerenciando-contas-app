// Importa o NextResponse do Next.js
// Ele serve para devolver respostas da API
import { NextResponse } from "next/server";


// Importa nossa conexão com o banco
// criada no arquivo lib/prisma.ts
import { prisma } from "../../../../lib/prisma";


// Função POST porque estamos enviando dados novos
// (cadastro de despesas)
export async function POST(request: Request) {

  // Recebe os dados enviados pelo formulário
  const body = await request.json();

  // Pegamos apenas os campos que precisamos
  const {
    nome,
    valor,
    categoriaId,
    data,
    descricao,
    
  } = body;

  try {

    

   await prisma.despesa.create({
      data: {

        nome,

        valor: parseFloat(valor),

        categoriaId: Number(categoriaId),

        data: new Date(data),

        descricao,
      },
    });

    // Retornamos sucesso
    return NextResponse.json({
      message: "Cadastro realizado com sucesso",
    });

  } catch (error) {

    // Agora mostramos o erro real no terminal
  // com mais destaque para descobrir o problema
     console.error("ERRO REAL:", error);

    // Retorno caso aconteça erro inesperado
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