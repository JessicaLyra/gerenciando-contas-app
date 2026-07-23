"use client";

  import { useRouter } from "next/navigation";
  import { useState, useMemo, useEffect } from "react";
  import {iconMap} from "@/utils/iconMap";
  import {CircleCheckBig,  Clock, WalletMinimal,  TriangleAlert, Gauge} from "lucide-react";
  import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector, PieSectorDataItem, TooltipIndex} from "recharts";

type Props = {
  mode: "total" | "categoria" | "categoria-total" | "despesa" | "dashboard";
  activeDespesa: any;
  activeCategoria?: any;
  selectedMonthLabel?: string;

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
  selectedMonthLabel,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [despesaAtual, setDespesaAtual] = useState(activeDespesa);
  useEffect(() => {
  setDespesaAtual(activeDespesa);
}, [activeDespesa]);

  // estado local para atualização imediata da interface
const [listaDespesas, setListaDespesas] = useState(despesas);
  useEffect(() => {
    setListaDespesas(despesas);
  }, [despesas]);


  function parseDataSemFuso(value: string | Date) {
  const texto = String(value).trim();

  const match = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    const [, year, month, day] = match;

    return new Date(
      Date.UTC(
        Number(year),
        Number(month) - 1,
        Number(day)
      )
    );
  }

  const data = new Date(value);

  return new Date(
    Date.UTC(
      data.getFullYear(),
      data.getMonth(),
      data.getDate()
    )
  );
}

  function formatarData(value: string | Date) {
  const data = parseDataSemFuso(value);

  return data.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

 // calcula dias restantes até vencimento
function calcularDiasRestantes(dataVencimento: string | Date) {
  const hoje = new Date();

  const hojeUTC = Date.UTC(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );

  const vencimento = parseDataSemFuso(dataVencimento);

  const diferencaMs = vencimento.getTime() - hojeUTC;

  return Math.round(
    diferencaMs / (1000 * 60 * 60 * 24)
  );
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

      const maiorDespesa = useMemo(() => {
  if (listaDespesas.length === 0) return null;

  return listaDespesas.reduce((maior, atual) =>
    Number(atual.valor) > Number(maior.valor) ? atual : maior
  );
}, [listaDespesas]);

  const menorDespesa = useMemo(() => {
    if (listaDespesas.length === 0) return null;

    return listaDespesas.reduce((menor, atual) =>
      Number(atual.valor) < Number(menor.valor) ? atual : menor
    );
  }, [listaDespesas]);

  const mediaDespesas =
    listaDespesas.length > 0
      ? totalGeral / listaDespesas.length
      : 0;

  const categoriasUtilizadas = categorias.filter(
    (categoria) => categoria.despesas.length > 0
  ).length;
      
  return (
    <section className="rounded-3xl bg-white/5 p-6">

      {/* HEADER */}
      <div className="mb-6 border-b border-white/10 pb-4">

        <p className="text-sm text-slate-400">
          {mode === "total"
            ? "Visão geral"
            : mode === "categoria-total" && activeCategoria
            ? "Resumo da categoria"
            : mode === "categoria" && activeCategoria
            ? "Categoria selecionada"
            : activeDespesa
            ? "Despesa selecionada"
            : "Dashboard"}
        </p>

        <h1 className="text-xl font-semibold">
          {mode === "total"
            ? "Todas as despesas"
            : mode === "categoria-total" && activeCategoria
            ? `Resumo de ${activeCategoria.nome}`
            : mode === "categoria" && activeCategoria
            ? activeCategoria.nome
            : activeDespesa?.nome || "Resumo"}
        </h1>

        {selectedMonthLabel && (
          <p className="mt-2 inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
            {selectedMonthLabel}
          </p>
        )}
      </div>

      {/* MODE TOTAL */}
      {mode === "total" ? (
        <div className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white p-4">
              <div>
                <h4 className="text-sm sm:text-lg font-semibold text-indigo-700">
                  Total Geral
                </h4>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
                  R$ {totalGeral.toFixed(2)}
                </h2>
              </div>

              <div className="rounded-full bg-green-100 p-3 shrink-0">
                <span className="text-green-950">
                  <iconMap.totalGeral />
                </span>
              </div>
            </div>


            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white p-4">
              <div>
                <h4 className="text-sm sm:text-lg font-semibold text-indigo-700">
                  Total Pago
                </h4>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
                  R$ {totalPago.toFixed(2)}
                </h2>
              </div>

              <div className="rounded-full bg-green-100 p-3 shrink-0">
                <span className="text-green-950">
                  <CircleCheckBig />
                </span>
              </div>
            </div>


            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white p-4">
              <div>
                <h4 className="text-sm sm:text-lg font-semibold text-indigo-700">
                  Pendente
                </h4>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
                  R$ {totalPendente.toFixed(2)}
                </h2>
              </div>

              <div className="rounded-full bg-yellow-100 p-3 shrink-0">
                <span className="text-yellow-950">
                  <Clock />
                </span>
              </div>
            </div>


            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white p-4">
              <div>
                <h4 className="text-sm sm:text-lg font-semibold text-indigo-700">
                  Contas
                </h4>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
                  {totalContas}
                </h2>
              </div>

              <div className="rounded-full bg-purple-200 p-3 shrink-0">
                <span className="text-purple-800">
                  <WalletMinimal />
                </span>
              </div>
            </div>


            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white p-4">
              <div>
                <h4 className="text-sm sm:text-lg font-semibold text-indigo-700">
                  Vencidas
                </h4>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
                  {contasVencidas}
                </h2>
              </div>

              <div className="rounded-full bg-red-200 p-3 shrink-0">
                <span className="text-red-500">
                  <TriangleAlert />
                </span>
              </div>
            </div>


            <div className="rounded-xl bg-white p-4 border border-white/10">

              <h4 className="text-sm sm:text-lg font-semibold text-indigo-700">
                Percentual Pago
              </h4>

              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">
                {percentualPago.toFixed(1)}%
              </h2>


              <div className="mt-4 h-2 w-full rounded-full bg-slate-700">
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

<div className="h-64 w-full max-w-full overflow-hidden">     
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
         <Pie
            data={dadosGrafico}
            dataKey="valor"
            nameKey="nome"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            label={({ percent = 0 }) =>
              `${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
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
<div className="rounded-xl bg-white/5 border border-white/10 p-4">
  <h2 className="text-lg font-semibold mb-4">
    💡 Insights
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between items-center border-b border-white/10 pb-3">
      <div>
        <p className="text-slate-400 text-sm">Maior despesa</p>
        <p className="text-white font-medium">
          {maiorDespesa?.nome ?? "-"}
        </p>
      </div>

      <span className="font-bold text-red-400 ">
        R$ {maiorDespesa ? Number(maiorDespesa.valor).toFixed(2) : "0.00"}
      </span>
    </div>

    <div className="flex justify-between items-center border-b border-white/10 pb-3">
      <div>
        <p className="text-slate-400 text-sm">Menor despesa</p>
        <p className="text-white font-medium">
          {menorDespesa?.nome ?? "-"}
        </p>
      </div>

      <span className="font-bold text-emerald-400">
        R$ {menorDespesa ? Number(menorDespesa.valor).toFixed(2) : "0.00"}
      </span>
    </div>

    <div className="flex justify-between items-center border-b border-white/10 pb-3">
      <p className="text-slate-400 text-sm">
        Média por despesa
      </p>

      <span className="font-bold text-white">
        R$ {mediaDespesas.toFixed(2)}
      </span>
    </div>

    <div className="flex justify-between items-center">
      <p className="text-slate-400 text-sm">
        Categorias utilizadas
      </p>

      <span className="font-bold text-indigo-400">
        {categoriasUtilizadas}
      </span>
    </div>

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
  className="border-b border-white/10 pb-3"
>
  <div className="flex items-center gap-3 w-full">

    {/* Ícone */}
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-indigo-500/20">
      <span className="text-indigo-400">
        <iconMap.totalGeral />
      </span>
    </div>


    {/* Nome e vencimento */}
    <div className="min-w-0 flex-1">

      <p className="truncate text-white font-medium">
        {d.nome}
      </p>

      <p className="mt-2 text-sm text-yellow-400">
        {dias < 0
          ? `Vencido há ${Math.abs(dias)} dias`
          : dias === 0
          ? "Vence hoje"
          : dias === 1
          ? "Vence amanhã"
          : `Vence em ${dias} dias`}
      </p>

    </div>


    {/* Data e valor */}
    <div className="shrink-0 text-right">

      <p className="text-xs text-slate-400">
        {new Date(d.data).toLocaleDateString("pt-BR")}
      </p>

      <p className="mt-2 text-lg sm:text-2xl font-bold text-white">
        R$ {Number(d.valor).toFixed(2)}
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

  <div className="flex items-center gap-3 w-full">

    {/* Ícone */}
    <div className="shrink-0">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/20">
        <span className="text-indigo-400">
          <iconMap.totalGeral />
        </span>
      </div>
    </div>


    {/* Nome + Categoria */}
    <div className="min-w-0 flex-1">

      <p className="truncate font-medium text-white">
        {d.nome}
      </p>

      <p className="truncate text-xs text-slate-400">
        {d.categoria?.nome}
      </p>

    </div>


    {/* Valor + Data */}
    <div className="shrink-0 text-right">

      <p className="font-bold text-white text-sm">
        R$ {Number(d.valor).toFixed(2)}
      </p>

      <p className="text-xs text-slate-400">
        {new Date(d.data).toLocaleDateString("pt-BR")}
      </p>

    </div>


    {/* Status */}
    <span
      className={`
        shrink-0 px-3 py-1 rounded-full text-xs font-medium
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

</li>

                        ))}

                      </ul>
                    </div>
                    
          </div>      
          

         

        </div>
      ) : mode === "categoria-total" && activeCategoria ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white p-4">
              <p className="text-sm font-medium text-indigo-700">Total da categoria</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">
                R$ {Number(totalCategoria || 0).toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white p-4">
              <p className="text-sm font-medium text-indigo-700">Pago</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">
                R$ {activeCategoria.despesas
                  .filter((d: any) => d.pago)
                  .reduce((acc: number, d: any) => acc + Number(d.valor), 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white p-4">
              <p className="text-sm font-medium text-indigo-700">Pendente</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">
                R$ {activeCategoria.despesas
                  .filter((d: any) => !d.pago)
                  .reduce((acc: number, d: any) => acc + Number(d.valor), 0)
                  .toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white p-4">
              <p className="text-sm font-medium text-indigo-700">Contas</p>
              <p className="mt-2 text-3xl font-bold text-gray-800">
                {activeCategoria.despesas.length}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg font-semibold text-white">Resumo rápido</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-400">Vencidas</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {activeCategoria.despesas.filter((d: any) => !d.pago && new Date(d.data) < new Date()).length}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-400">Próximas a vencer</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {[...activeCategoria.despesas]
                    .filter((d: any) => !d.pago)
                    .sort((a: any, b: any) => new Date(a.data).getTime() - new Date(b.data).getTime())
                    .slice(0, 3)
                    .map((d: any) => d.nome)
                    .join(", ") || "Sem pendências"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg font-semibold text-white">Despesas da categoria</h2>

            <div className="mt-4 space-y-2">
              {activeCategoria.despesas.map((d: any) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between border-b border-white/10 pb-2 text-sm text-slate-300"
                >
                  <span>{d.nome}</span>
                  <span>R$ {Number(d.valor).toFixed(2)}</span>
                </div>
              ))}
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
        ) : despesaAtual ? (        <div>

          <p className="mt-2 text-slate-300">
            {despesaAtual.descricao}
          </p>

          <div className="mt-5 space-y-2">

            <p className="text-xl font-bold">
              R$ {Number(despesaAtual.valor).toFixed(2)}
            </p>

            <p className="text-sm text-slate-400">
              Vencimento:{" "}
              {formatarData(despesaAtual.data)}            </p>

            <p className="text-sm text-slate-500">
              Data do cadastro:{" "}
              {new Date(activeDespesa.createdAt).toLocaleDateString("pt-BR")}
            </p>

            {!despesaAtual.pago && diasRestantes > 0 && (
              <p className="text-sm text-emerald-400">
                Faltam {diasRestantes} dias para vencer
              </p>
            )}

            {!despesaAtual.pago && diasRestantes === 0 && (
              <p className="text-sm text-yellow-400">
                Vence hoje
              </p>
            )}

            {!despesaAtual.pago && diasRestantes < 0 && (
              <p className="text-sm text-red-400">
                Vencida há {Math.abs(diasRestantes)} dias
              </p>
            )}

            <p
              className={`text-sm font-medium ${
                despesaAtual.pago
                  ? "text-emerald-400"
                  : "text-yellow-400"
              }`}
            >
              {despesaAtual.pago ? "Conta paga" : "Conta pendente"}
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
                      pago: !despesaAtual.pago,
                    }),
                  });

                  setListaDespesas((prev) =>
                    prev.map((d) =>
                      d.id === activeDespesa.id
                        ? { ...d, pago: !d.pago }
                        : d
                    )
                  );

                  setDespesaAtual((prev:any) => ({
                    ...prev,
                    pago: !prev.pago
                  }));
                 
                  

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
                  despesaAtual.pago
                    ? "bg-emerald-500"
                    : "bg-slate-600"
                }
              `}
            >
              <span
                className={`
                  absolute top-1 h-5 w-5 bg-white rounded-full transition
                  ${despesaAtual.pago ? "left-8" : "left-1"}
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