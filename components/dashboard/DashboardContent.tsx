"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  mode: "total" | "categoria" | "despesa" | "dashboard";
  activeDespesa: any;
  activeCategoria?: any;
  totalGeral: number;
  totalCategoria?: number;
};

export default function DashboardContent({
  mode,
  activeDespesa,
  activeCategoria,
  totalGeral,
  totalCategoria,
}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

  function calcularDiasRestantes(dataVencimento: string) {

    const hoje = new Date();

    const vencimento = new Date(dataVencimento);

    const diferencaMs =
      vencimento.getTime() - hoje.getTime();

    return Math.ceil(
      diferencaMs / (1000 * 60 * 60 * 24)
    );

  } const diasRestantes = activeDespesa
    ? calcularDiasRestantes(activeDespesa.data)
    : 0;
  console.log(activeDespesa);
  return (
    <section className="rounded-3xl bg-white/5 p-6">
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
      {/* ------------------------------------------------------------
        MODO 1: TOTAL GERAL
      ------------------------------------------------------------ */}
      {mode === "total" ? (
        <div>
          <h2 className="text-2xl font-semibold">
            Total de Despesas
          </h2>

          <p className="mt-4 text-3xl font-bold text-emerald-400">
            R$ {totalGeral.toFixed(2)}
          </p>

          <p className="mt-2 text-slate-300">
            Soma de todas as despesas cadastradas no sistema
          </p>
        </div>

      ) : mode === "categoria" && activeCategoria ? (

        /* ------------------------------------------------------------
          MODO 2: CATEGORIA
        ------------------------------------------------------------ */
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

        /* ------------------------------------------------------------
          MODO 3: DESPESA INDIVIDUAL
        ------------------------------------------------------------ */
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
              className={`text-sm font-medium ${activeDespesa.pago
                ? "text-emerald-400"
                : "text-yellow-400"
                }`}
            >
              {activeDespesa.pago
                ? "🟢 Conta paga"
                : "🟡 Conta pendente"}
            </p>
            {loading && (
              <p className="text-sm text-slate-400">
                Atualizando status...
              </p>
            )}
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

                  router.refresh();

                } catch (error) {

                  console.error(error);

                } finally {

                  setLoading(false);

                }

              }}
              className={`
                relative h-7 w-14 rounded-full transition
                ${activeDespesa.pago
                  ? "bg-emerald-500"
                  : "bg-slate-600"}
              `}
            >
              <span
                className={`
                  absolute top-1 h-5 w-5 rounded-full bg-white transition
                  ${activeDespesa.pago
                    ? "left-8"
                    : "left-1"}
                `}
              />
            </button>

          </div>
        </div>

      ) : (

        /* ------------------------------------------------------------
          FALLBACK
        ------------------------------------------------------------ */
        <div>
          <h2 className="text-xl font-semibold">
            Dashboard
          </h2>

          <p className="mt-2 text-slate-300">
            Selecione uma despesa, categoria ou o total
          </p>
        </div>
      )}

    </section>
  );
}