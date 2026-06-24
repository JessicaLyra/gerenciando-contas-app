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
    skipDuplicates: true,
  });

  console.log("Categorias criadas");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });