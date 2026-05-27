import { prisma } from "../lib/prisma";

async function main() {
  await prisma.categoria.createMany({
    data: [
      { nome: "Alimentação" },
      { nome: "Transporte" },
      { nome: "Moradia" },
      { nome: "Lazer" },
      { nome: "Saúde" },
    ],
  });

  console.log("Categorias criadas");
}

main();