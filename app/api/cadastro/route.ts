// Importa o NextResponse do Next.js
// Ele serve para devolver respostas da API


import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Importa nossa conexão com o banco
// criada no arquivo lib/prisma.ts
import { prisma } from "@/lib/prisma";


// Função POST porque estamos enviando dados novos
// (cadastro de usuário)
export async function POST(request: Request) {
    console.log("🔥 CADASTRO CHAMADO");
  console.log("ENV DATABASE_URL:", process.env.DATABASE_URL);

  return Response.json({ ok: true }); 
  // Recebe os dados enviados pelo formulário
  const body = await request.json();

  // Pegamos apenas os campos que precisamos
  const {
    usuario,
    email,
    senha,
  } = body;

  try {

    // Primeiro verificamos se já existe alguém
    // com esse mesmo email no banco
    const usuarioExistente = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Se já existir, retornamos erro
    if (usuarioExistente) {
      return NextResponse.json(
        {
          message: "Este e-mail já está cadastrado",
        },
        {
          status: 400,
        }
      );
    }

    // Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Se não existir, criamos o usuário
    await prisma.user.create({
      data: {
        usuario,
        email,
         senha: senhaCriptografada,
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
      console.log("❌ ERRO CADASTRO:", error);
      
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