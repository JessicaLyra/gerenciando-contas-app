export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { prisma } from "@/lib/prisma";


export default async function Page() {

  // Busca categorias no banco
  const categorias = await prisma.categoria.findMany({
    include: {
      despesas: true,
    },
  });

  return (
    <DashboardLayout categorias={categorias} />
  );
}