import { prisma } from "../lib/prisma";

async function main() {
  await prisma.categoria.createMany({
    data: [
      { nome: "Alimentação" },
      { nome: "Transporte" },
      { nome: "Moradia" },
      { nome: "Lazer" },
      { nome: "Saúde" },
      { nome: "Educação" },
      { nome: "Roupas" },
      { nome: "Tecnologia" },
      { nome: "Viagem" },
      { nome: "Outros" },
    ],
  });

  console.log("Categorias criadas");
}

main();