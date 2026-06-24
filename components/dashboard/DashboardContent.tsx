"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {iconMap} from "@/utils/iconMap";
import {CircleCheckBig,  Clock, WalletMinimal } from "lucide-react";
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector, PieSectorDataItem, TooltipIndex} from "recharts";
import { RechartsDevtools } from '@recharts/devtools';

type Props = {
  mode: "total" | "categoria" | "despesa" | "dashboard";
  activeDespesa: any;
  activeCategoria?: any;

  // total geral de todas as despesas
  totalGeral: number;

  // total da categoria selecionada
  totalCategoria?: number;

  // lista de despesas
  despesas: any[];

  categorias?: any[];
};

export default function DashboardContent({
  mode,
  activeDespesa,
  activeCategoria,
  totalGeral,
  totalCategoria,
  despesas = [],
  categorias = [],
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // estado local para atualização imediata da interface
const [listaDespesas, setListaDespesas] = useState(despesas);

  // calcula dias restantes até vencimento
  function calcularDiasRestantes(dataVencimento: string) {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);

    const diferencaMs = vencimento.getTime() - hoje.getTime();

    return Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
  }

  // total pago (dinâmico)
  const totalPago = useMemo(() => {
    return listaDespesas
      .filter((d) => d.pago)
      .reduce((acc, d) => acc + Number(d.valor), 0);
  }, [listaDespesas]);

  // total pendente (dinâmico)
  const totalPendente = useMemo(() => {
    return listaDespesas
      .filter((d) => !d.pago)
      .reduce((acc, d) => acc + Number(d.valor), 0);
  }, [listaDespesas]);

  // total de contas
  const totalContas = listaDespesas.length;
  const percentualPago =
  totalGeral > 0
    ? (totalPago / totalGeral) * 100
    : 0;
  // próximos vencimentos
  const proximosVencimentos = useMemo(() => {
    return [...listaDespesas]
      .filter((d) => !d.pago)
      .sort(
        (a, b) =>
          new Date(a.data).getTime() - new Date(b.data).getTime()
      )
      .slice(0, 5);
  }, [listaDespesas]);

  //ultimas despesas
 const ultimasDespesas = useMemo(() => {
  return [...listaDespesas]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
}, [listaDespesas]);
  

  // dias restantes da despesa ativa
  const diasRestantes = activeDespesa
    ? calcularDiasRestantes(activeDespesa.data)
    : 0;

    const contasVencidas = listaDespesas.filter((d) => {
                  return (
                    !d.pago &&
                    new Date(d.data) < new Date()
                  );
                }).length;

    const dadosGrafico = categorias.map((categoria: any) => ({
        nome: categoria.nome,
        valor: categoria.despesas.reduce(
          (acc: number, d: any) => acc + Number(d.valor),
          0
        ),
      }));
      const COLORS = [
        "#6366F1", // indigo
        "#10B981", // green
        "#F59E0B", // amber
        "#EF4444", // red
        "#8B5CF6", // violet
        "#06B6D4", // cyan
        "#EC4899", // pink
        "#84CC16", // lime
        "#F97316", // orange
        "#14B8A6", // teal
      ];
      
  return (
    <section className="rounded-3xl bg-white/5 p-6">

      {/* HEADER */}
      <div className="mb-6 border-b border-white/10 pb-4">

        <p className="text-sm text-slate-400">
          {mode === "total"
            ? "Visão geral"
            : mode === "categoria" && activeCategoria
            ? "Categoria selecionada"
            : activeDespesa
            ? "Despesa selecionada"
            : "Dashboard"}
        </p>

        <h1 className="text-xl font-semibold">
          {mode === "total"
            ? "Todas as despesas"
            : mode === "categoria" && activeCategoria
            ? activeCategoria.nome
            : activeDespesa?.nome || "Resumo"}
        </h1>
      </div>

      {/* MODE TOTAL */}
      {mode === "total" ? (
        <div className="space-y-6">

          <div className="grid md:grid-cols-4 sm:grid-cols-5 gap-4">

            <div className="flex items-center   justify-between rounded-xl border border-white/10 bg-white p-4">
              <div >
              <h4 className="text-lg font-semibold text-indigo-700 pb-5">Total Geral</h4>
              <h2 className="text-3xl font-bold text-gray-800 pb-5">
                R$ {totalGeral.toFixed(2)}
              </h2>
              </div>
              <div className="rounded-full bg-green-100 p-3 ">
              <span className="text-green-950"><iconMap.totalGeral /></span>
              </div>
            </div>

            <div className="flex items-center   justify-between rounded-xl border border-white/10 bg-white p-4">
               <div >
              <h4 className="text-lg font-semibold text-indigo-700 pb-5">Total Pago</h4>
              <h2 className="text-3xl font-bold text-gray-800 pb-5">
                R$ {totalPago.toFixed(2)}
              </h2>
              </div>
              <div className="rounded-full bg-green-100 p-3 ">
              <span className="text-green-950"><CircleCheckBig /></span>
              </div>
            </div>

            <div className="flex items-center   justify-between rounded-xl border border-white/10 bg-white p-4">
               <div >
              <h4 className="text-lg font-semibold text-indigo-700 pb-5">Pendente</h4>
              <h2 className="text-3xl font-bold text-gray-800 pb-5">
                R$ {totalPendente.toFixed(2)}
              </h2>
              </div>
              <div className="rounded-full bg-yellow-100 p-3 ">
              <span className="text-yellow-950"><Clock /></span>
              </div>
            </div>

            <div className="flex items-center   justify-between rounded-xl border border-white/10 bg-white p-4">
              <div>
              <h4 className="text-lg font-semibold text-indigo-700 pb-5">Contas</h4>
              <h2 className="text-3xl font-bold text-gray-800 pb-5">
                {totalContas}
              </h2>
              </div>
              <div className="rounded-full bg-purple-200 p-3 ">
              <span className="text-purple-800"><WalletMinimal /></span>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 border border-white/10">
              <h4 className="text-lg font-semibold text-indigo-700">
                Vencidas
              </h4>

              <h2 className="text-3xl font-bold text-gray-800">
                {contasVencidas}
              </h2>
            </div>
            <div className="rounded-xl bg-white p-4 border border-white/10">
              <h4 className="text-lg font-semibold text-indigo-700">
                Percentual Pago
              </h4>

              <h2 className="text-3xl font-bold text-gray-800">
                {percentualPago.toFixed(1)}%
              </h2>

              <div className="mt-3 h-2 w-full rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${percentualPago}%`,
                  }}
                />
              </div>
            </div>

          </div>
        <div className="grid md:grid-cols-2 gap-4">

  {/* GRÁFICO */}
  <div className=" w-full rounded-xl bg-white/5 border border-white/10 p-4 md:flex md:inline-flex sm:inline-block">

    <h2 className="mb-4 text-lg font-semibold text-white">
      Gastos por Categoria
    </h2>

    <div className="h-64 w-100">
      <ResponsiveContainer class="">
        <PieChart>
          <Pie
            data={dadosGrafico}
            dataKey="valor"
            nameKey="nome"
            cx="30%"
            cy="60%"
            outerRadius={90}
            innerRadius={60}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {dadosGrafico.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-4 space-y-2 w-50">
      {dadosGrafico.map((item, index) => (
        <div
          key={item.nome}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor:
                  COLORS[index % COLORS.length],
              }}
            />

            <span className="text-slate-300">
              {item.nome}
            </span>
          </div>

          <span className="font-medium text-white">
            {(
              (item.valor /
                dadosGrafico.reduce(
                  (acc, d) => acc + d.valor,
                  0
                )) *
              100
            ).toFixed(1)}
            %
          </span>
        </div>
      ))}
    </div>

  </div>

  {/* BLOCO FUTURO */}
  <div className="rounded-xl bg-white/5 border border-white/10 p-4">

    
            <h2 className="text-lg font-semibold mb-3">
              Próximos vencimentos
            </h2>

            <ul className="space-y-2 text-slate-300 text-sm">

              {proximosVencimentos.map((d) => {
                const dias = calcularDiasRestantes(d.data);
                return (

                    <li
                      key={d.id}
                      className="border-b border-white/10 pb-2"
                    >
                      <div class="grid grid-cols-12 gap-6 w-full">
                      
                        <div class="col-span-2 bg-indigo-500/20 h-12 my-1 mx-2 w-full rounded-md">
                          <span className="text-indigo-400 py-3 px-3 md:px-7  block rounded-md"><iconMap.totalGeral className="  "/></span>

                        </div>
                
  
                        <div class="col-span-7  py-0">
                          <p className="text-white">{d.nome}</p>
                          <p className="text-yellow-400 text-sm mt-4">
                          Vence em {calcularDiasRestantes(d.data)} dias
                          </p>
                        </div>

                      
                        <div class="col-span-3 md:col-span-3 py-0 px-4">
                          <p className="text- text-xs">
                          {new Date(d.data).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="mt-4 text-2xl font-bold text-white" >
                         {Number(d.valor).toFixed(2)}

                        </p>
                        </div>
                      </div>  
                    </li>
                  );
                })}

            </ul>
          

  </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                      <h2 className="text-lg font-semibold mb-3">
                        Últimas Despesas
                      </h2>

                      <ul className="space-y-3">

                        {ultimasDespesas.map((d) => (

                          <li
                            key={d.id}
                            className="border-b border-white/10 pb-3"
                          >

                            <div className="grid grid-cols-12 gap-4 items-center">

                              {/* Ícone */}
                              <div className="md:col-span-2 col-span-1">

                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20">

                                  <span className="text-indigo-400">
                                    <iconMap.totalGeral />
                                  </span>

                                </div>

                              </div>

                              {/* Nome + Categoria */}
                              <div className="col-span-3 md:col-span-4">

                                <p className="font-medium text-white">
                                  {d.nome}
                                </p>

                                <p className="text-xs text-slate-400">
                                  {d.categoria?.nome}
                                </p>

                              </div>

                              {/* Valor */}
                              <div className="md:col-span-2 col-span-3">

                                <p className="font-bold text-white text-sm">
                                  R$ {Number(d.valor).toFixed(2)}
                                </p>

                              </div>

                              {/* Data */}
                              <div className="col-span-2 sm:col-span-none">

                                <p className="text-xs text-slate-400">
                                  {new Date(d.data).toLocaleDateString("pt-BR")}
                                </p>

                              </div>

                              {/* Status */}
                              <div className="col-span-1">

                                <span
            className={`
              px-4 py-2 rounded-full text-xs font-medium
              ${
                d.pago
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }
            `}
          >
            {d.pago ? "Pago" : "Pendente"}
          </span>

                              </div>

                            </div>

                          </li>

                        ))}

                      </ul>
                    </div>
          </div>      
          

         

        </div>
      ) : mode === "categoria" && activeCategoria ? (
        <div>

          <p className="mt-4 text-3xl font-bold text-indigo-400">
            R$ {totalCategoria?.toFixed(2)}
          </p>

          <p className="mt-2 text-slate-300">
            Total da categoria selecionada
          </p>

          <div className="mt-6 space-y-2">
            {activeCategoria.despesas.map((d: any) => (
              <div
                key={d.id}
                className="flex justify-between text-sm text-slate-300 border-b border-white/10 pb-2"
              >
                <span>{d.nome}</span>
                <span>R$ {Number(d.valor).toFixed(2)}</span>
              </div>
            ))}
          </div>

        </div>
      ) : activeDespesa ? (
        <div>

          <p className="mt-2 text-slate-300">
            {activeDespesa.descricao}
          </p>

          <div className="mt-5 space-y-2">

            <p className="text-xl font-bold">
              R$ {Number(activeDespesa.valor).toFixed(2)}
            </p>

            <p className="text-sm text-slate-400">
              Vencimento:{" "}
              {new Date(activeDespesa.data).toLocaleDateString("pt-BR")}
            </p>

            <p className="text-sm text-slate-500">
              Criado em:{" "}
              {new Date(activeDespesa.createdAt).toLocaleDateString("pt-BR")}
            </p>

            {diasRestantes > 0 && (
              <p className="text-sm text-emerald-400">
                Faltam {diasRestantes} dias para vencer
              </p>
            )}

            {diasRestantes === 0 && (
              <p className="text-sm text-yellow-400">
                Vence hoje
              </p>
            )}

            {diasRestantes < 0 && (
              <p className="text-sm text-red-400">
                Vencida há {Math.abs(diasRestantes)} dias
              </p>
            )}

            <p
              className={`text-sm font-medium ${
                activeDespesa.pago
                  ? "text-emerald-400"
                  : "text-yellow-400"
              }`}
            >
              {activeDespesa.pago ? "Conta paga" : "Conta pendente"}
            </p>

            <button
              disabled={loading}
              onClick={async () => {
                try {
                  setLoading(true);

                  await fetch("/api/dashboard/pagar-despesa", {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: activeDespesa.id,
                      pago: !activeDespesa.pago,
                    }),
                  });

                  setListaDespesas((prev) =>
                    prev.map((d) =>
                      d.id === activeDespesa.id
                        ? { ...d, pago: !d.pago }
                        : d
                    )
                  );

                  router.refresh();
                } catch (error) {
                  console.error(error);
                } finally {
                  setLoading(false);
                }
              }}
              className={`
                relative h-7 w-14 rounded-full transition
                ${
                  activeDespesa.pago
                    ? "bg-emerald-500"
                    : "bg-slate-600"
                }
              `}
            >
              <span
                className={`
                  absolute top-1 h-5 w-5 bg-white rounded-full transition
                  ${activeDespesa.pago ? "left-8" : "left-1"}
                `}
              />
            </button>
            </div>
            <div className="mt-6">
            <button
                onClick={() =>
                  router.push(`/dashboard/despesa/${activeDespesa.id}/editar`)
                }
                className=" transition  px-10 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm"
              >
                Editar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-slate-300 mt-2">
            Selecione uma despesa, categoria ou o total
          </p>
        </div>
      )}

    </section>
  );
}