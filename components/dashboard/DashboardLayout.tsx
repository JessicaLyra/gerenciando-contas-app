"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";

type Props = {
  categorias: any[];
};

export default function DashboardLayout({ categorias }: Props) {
  const router = useRouter();

  // 🔥 ID do item selecionado (categoria ou despesa ou "total")
  const [activeId, setActiveId] = useState("total");

  // ------------------------------------------------------------
  // 🔥 SOMA TOTAL DE TODAS AS DESPESAS (dashboard geral)
  // ------------------------------------------------------------
  const totalGeral = useMemo(() => {
    return categorias.reduce((acc: number, categoria: any) => {
      return (
        acc +
        categoria.despesas.reduce(
  (sum: number, d: any) => sum + Number(d.valor),
  0
)
      );
    }, 0);
  }, [categorias]);

  // ------------------------------------------------------------
  // 🔥 MENU DO SIDEBAR (categorias + despesas)
  // ------------------------------------------------------------
  const menu = categorias.map((categoria: any) => ({
    id: categoria.id.toString(),
    label: categoria.nome,
    description: `Categoria: ${categoria.nome}`,

      subItems: categoria.despesas.map((despesa: any) => ({
      id: despesa.id.toString(),
      label: despesa.nome,
      description: despesa.descricao,
      amount: `R$ ${Number(despesa.valor).toFixed(2)}`,
    })),
  }));

  // ------------------------------------------------------------
  // 🔥 ADICIONA ITEM "TOTAL" NO TOPO DO MENU
  // ------------------------------------------------------------
  const menuWithTotal = [
    {
      id: "total",
      label: "Total",
      description: "Soma de todas as despesas",
      amount: `R$ ${totalGeral.toFixed(2)}`,
      subItems: [],
    },
    ...menu,
  ];

  // ------------------------------------------------------------
  // 🔥 DESPESA ATIVA (quando usuário clica em uma despesa)
  // ------------------------------------------------------------
  const activeDespesa = useMemo(() => {
    for (const categoria of categorias) {
      const despesa = categoria.despesas.find(
        (d: any) => d.id.toString() === activeId
      );

      if (despesa) return despesa;
    }

    return null;
  }, [activeId, categorias]);

  // ------------------------------------------------------------
  // 🔥 VERIFICA SE USUÁRIO CLICOU EM "TOTAL"
  // ------------------------------------------------------------
  const isTotal = activeId === "total";

  // ------------------------------------------------------------
  // 🔥 LOGOUT
  // ------------------------------------------------------------
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-6 space-y-6">

        {/* HEADER */}
        <DashboardHeader onLogout={handleLogout} />

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">

          {/* SIDEBAR */}
          <DashboardSidebar
            menu={menuWithTotal}
            activeId={activeId}
            onChange={setActiveId}
          />

          {/* CONTENT */}
          <DashboardContent
            activeDespesa={activeDespesa}
            isTotal={isTotal}
            totalGeral={totalGeral}
          />

        </div>
      </div>
    </div>
  );
}