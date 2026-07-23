"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";
import { normalizeKey } from "@/utils/normalizeKey";

type Props = {
  categorias: any[];
};

function formatMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(monthKey: string) {
  if (monthKey === "all") return "Todos os meses";

  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}

export default function DashboardLayout({ categorias }: Props) {
  const router = useRouter();

  //  ID do item selecionado (categoria ou despesa ou "total")
  const [activeId, setActiveId] = useState("total");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const mode = useMemo(() => {
    if (activeId === "total") return "total";

    if (activeId.startsWith("categoria-total-")) return "categoria-total";

    if (activeId.startsWith("categoria-")) return "categoria";

    if (activeId.startsWith("despesa-")) return "despesa";

    return "dashboard";
  }, [activeId]);

  const availableMonths = useMemo(() => {
    const months = new Set<string>();

    categorias.forEach((categoria: any) => {
      categoria.despesas.forEach((despesa: any) => {
        months.add(formatMonthKey(new Date(despesa.data)));
      });
    });

    return ["all", ...Array.from(months).sort((a, b) => b.localeCompare(a))];
  }, [categorias]);

  const categoriasFiltradas = useMemo(() => {
    return categorias.map((categoria: any) => ({
      ...categoria,
      despesas: categoria.despesas.filter((despesa: any) => {
        if (selectedMonth === "all") return true;
        return formatMonthKey(new Date(despesa.data)) === selectedMonth;
      }),
    }));
  }, [categorias, selectedMonth]);

// ------------------------------------------------------------
// TODAS AS DESPESAS
// ------------------------------------------------------------
const todasDespesas = categoriasFiltradas.flatMap(
  (categoria: any) => categoria.despesas
);

// ------------------------------------------------------------
// SOMA TOTAL DE TODAS AS DESPESAS
// ------------------------------------------------------------
const totalGeral = useMemo(() => {
  return categoriasFiltradas.reduce((acc: number, categoria: any) => {
    return (
      acc +
      categoria.despesas.reduce(
        (sum: number, d: any) => sum + Number(d.valor),
        0
      )
    );
  }, 0);
}, [categoriasFiltradas]);

  

  
  // ------------------------------------------------------------
  //  MENU DO SIDEBAR (categorias + despesas)
  // ------------------------------------------------------------
  const menu = categoriasFiltradas.map((categoria: any) => ({
    id: `categoria-${categoria.id}`,
    label: categoria.nome,
    icon: normalizeKey(categoria.nome),
    description: `Categoria: ${categoria.nome}`,

    subItems: [
      {
        id: `categoria-total-${categoria.id}`,
        label: "Resumo da Categoria",
        icon: "resumo",
        description: `Resumo de ${categoria.nome}`,
        amount: `R$ ${categoria.despesas
          .reduce((sum: number, d: any) => sum + Number(d.valor), 0)
          .toFixed(2)}`,
      },
      ...categoria.despesas.map((despesa: any) => ({
        id: `despesa-${despesa.id}`,
        label: despesa.nome,
        icon: "despesa",
        description: despesa.descricao,
        amount: `R$ ${Number(despesa.valor).toFixed(2)}`,
      })),
    ],
  }));

  // ------------------------------------------------------------
  //  ADICIONA ITEM "TOTAL" NO TOPO DO MENU
  // ------------------------------------------------------------
  const menuWithTotal = [
    {
      id: "total",
      label: "Total",
      icon: "total",
      description: "Soma de todas as despesas",
      amount: `R$ ${totalGeral.toFixed(2)}`,
      subItems: [],
    },
    ...menu,
  ];

  // ------------------------------------------------------------
  //  DESPESA ATIVA (quando usuário clica em uma despesa)
  // ------------------------------------------------------------
  const activeDespesa = useMemo(() => {
    for (const categoria of categoriasFiltradas) {
      const despesa = categoria.despesas.find(
      (d: any) => `despesa-${d.id}` === activeId);

      if (despesa) return despesa;
    }

    return null;
  }, [activeId, categoriasFiltradas]);

  // ------------------------------------------------------------
  //  CATEGORIA ATIVA (quando usuário clica em uma categoria)
  // ------------------------------------------------------------
  const activeCategoria = useMemo(() => {
    for (const categoria of categoriasFiltradas) {
      if (
        `categoria-${categoria.id}` === activeId ||
        `categoria-total-${categoria.id}` === activeId
      ) {
        return categoria;
      }
    }

    return null;
  }, [activeId, categoriasFiltradas]);

  // ------------------------------------------------------------
  //  TOTAL DA CATEGORIA ATIVA
  // ------------------------------------------------------------
  const totalCategoria = useMemo(() => {
    if (!activeCategoria) return 0;

    return activeCategoria.despesas.reduce((sum: number, d: any) => {
      return sum + Number(d.valor);
    }, 0);
  }, [activeCategoria]);

 
  // ------------------------------------------------------------
  //  LOGOUT
  // ------------------------------------------------------------
  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-full p-6 space-y-6">

        {/* HEADER */}
        <DashboardHeader onLogout={handleLogout} />

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-400">Controle mensal</p>
              <h2 className="text-lg font-semibold text-white">
                {selectedMonth === "all"
                  ? "Todos os meses"
                  : formatMonthLabel(selectedMonth)}
              </h2>
            </div>

            <select
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none"
            >
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month === "all" ? "Todos os meses" : formatMonthLabel(month)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">

          {/* SIDEBAR */}
          <DashboardSidebar
            menu={menuWithTotal}
            activeId={activeId}
            onChange={setActiveId}
           
          />

          {/* CONTENT */}
          <DashboardContent
            mode={mode}
            activeDespesa={activeDespesa}
            activeCategoria={activeCategoria}
            totalGeral={totalGeral}
            totalCategoria={totalCategoria}
            despesas={todasDespesas}
            categorias={categoriasFiltradas}
            selectedMonthLabel={
              selectedMonth === "all"
                ? "Todos os meses"
                : formatMonthLabel(selectedMonth)
            }
          />

        </div>
      </div>
    </div>
  );
}