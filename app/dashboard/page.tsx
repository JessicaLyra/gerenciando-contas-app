export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { prisma } from "@/lib/prisma";

export default async function Page() {

  const categoriasRaw = await prisma.categoria.findMany({
    include: {
      despesas: true,
    },
  });

  const categorias = JSON.parse(
    JSON.stringify(categoriasRaw)
  );
  
  return (
    <DashboardLayout categorias={categorias} />
  );
}