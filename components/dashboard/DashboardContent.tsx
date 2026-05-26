import { Despesa } from "@prisma/client";

type Props = {
  activeDespesa: Despesa | null;
  isTotal: boolean;
  totalGeral: number;
};

export default function DashboardContent({
  activeDespesa,
  isTotal,
  totalGeral,
}: Props) {
  return (
    <section className="rounded-3xl bg-white/5 p-6">

      {/* ------------------------------------------------------------
        🔥 MODO 1: TOTAL GERAL (quando clica no item "Total")
      ------------------------------------------------------------ */}
      {isTotal ? (
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

      ) : activeDespesa ? (

        /* ------------------------------------------------------------
          🔥 MODO 2: DESPESA INDIVIDUAL
        ------------------------------------------------------------ */
        <div>
          <h2 className="text-2xl font-semibold">
            {activeDespesa.nome}
          </h2>

          <p className="mt-2 text-slate-300">
            {activeDespesa.descricao}
          </p>

          <div className="mt-5 space-y-2">

            {/* Valor */}
            <p className="text-xl font-bold">
              R$ {Number(activeDespesa.valor).toFixed(2)}
            </p>

            {/* Data da despesa */}
            <p className="text-sm text-slate-400">
              Data:{" "}
              {new Date(activeDespesa.data).toLocaleDateString("pt-BR")}
            </p>

            {/* Data de criação */}
            <p className="text-sm text-slate-500">
              Criado em:{" "}
              {new Date(activeDespesa.createdAt).toLocaleDateString("pt-BR")}
            </p>

          </div>
        </div>

      ) : (
        /* ------------------------------------------------------------
          🔥 FALLBACK (caso nada esteja selecionado)
        ------------------------------------------------------------ */
        <div>
          <h2 className="text-xl font-semibold">
            Dashboard
          </h2>

          <p className="mt-2 text-slate-300">
            Selecione uma despesa ou o total para visualizar os dados
          </p>
        </div>
      )}

    </section>
  );
}