export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function Page() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const decoded: any = jwt.verify(
    token,
    process.env.JWT_SECRET!
  );

  const userId = decoded.id;


  const categoriasRaw = await prisma.categoria.findMany({
    where: {
      despesas: {
        some: {
          userId,
        },
      },
    },
    include: {
      despesas: {
        where: {
          userId,
        },
      },
    },
  });


  const categorias = JSON.parse(
    JSON.stringify(categoriasRaw)
  );

  return (
    <DashboardLayout categorias={categorias} />
  );
}