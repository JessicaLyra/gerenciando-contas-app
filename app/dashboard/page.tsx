"use client";

import { useMemo, useState } from "react";

type MenuItem = {
  id: string;
  label: string;
  description: string;
  amount?: string;
  subItems?: MenuItem[];
};

const menu: MenuItem[] = [
  {
    id: "total",
    label: "Total",
    description: "Visão geral de todas as despesas.",
    amount: "R$ 3.450,00",
  },
  {
    id: "pessoais",
    label: "Pessoais",
    description: "Despesas de utilidades e moradia.",
    subItems: [
      { id: "pessoais-gas", label: "Gás", description: "Conta de gás residencial.", amount: "R$ 120,00" },
      { id: "pessoais-luz", label: "Luz", description: "Energia elétrica mensal.", amount: "R$ 210,00" },
      { id: "pessoais-internet", label: "Internet", description: "Plano de internet e dados.", amount: "R$ 140,00" },
      { id: "pessoais-agua", label: "Água", description: "Consumo de água e esgoto.", amount: "R$ 90,00" },
      { id: "pessoais-condominio", label: "Condomínio", description: "Taxa condominial mensal.", amount: "R$ 380,00" },
      { id: "pessoais-iptu", label: "IPTU", description: "Imposto urbano anual.", amount: "R$ 320,00" },
    ],
  },
  {
    id: "estudos",
    label: "Estudos",
    description: "Despesas com formação e cursos.",
    subItems: [
      { id: "estudos-estacio-sa", label: "Estácio SA", description: "Mensalidade e material escolar.", amount: "R$ 850,00" },
    ],
  },
];

function findActiveItem(items: MenuItem[], id: string): MenuItem | undefined {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }

    if (item.subItems) {
      const subItem = findActiveItem(item.subItems, id);
      if (subItem) {
        return subItem;
      }
    }
  }

  return undefined;
}

export default function DashboardPage() {
  const [activeId, setActiveId] = useState("total");

  const activeItem = useMemo(() => findActiveItem(menu, activeId) ?? menu[0], [activeId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/10 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Painel de despesas</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Minha conta de despesas</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Navegue pelo menu à esquerda para ver totais e detalhes de cada categoria. Esta tela exibe despesas pessoais, utilidades e estudos.
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <nav className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/10">
            {menu.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => setActiveId(item.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                    activeId === item.id ? "bg-slate-700 text-white" : "bg-slate-950/60 text-slate-300 hover:bg-slate-800/90"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.amount ? <span className="text-sm text-slate-300">{item.amount}</span> : null}
                </button>

                {item.subItems ? (
                  <div className="mt-3 space-y-2 px-2">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setActiveId(subItem.id)}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-2 text-sm transition ${
                          activeId === subItem.id ? "bg-slate-700 text-white" : "bg-slate-950/50 text-slate-300 hover:bg-slate-800/90"
                        }`}
                      >
                        <span>{subItem.label}</span>
                        <span className="text-slate-400">{subItem.amount}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 backdrop-blur">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                  Selecionado
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-white">{activeItem.label}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{activeItem.description}</p>
              </div>

              {activeItem.amount ? (
                <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-right text-sm text-slate-200">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Valor estimado</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{activeItem.amount}</p>
                </div>
              ) : null}
            </div>

            {activeItem.id === "total" ? (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Pessoais</p>
                    <p className="mt-4 text-3xl font-semibold text-white">R$ 1.260,00</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Estudos</p>
                    <p className="mt-4 text-3xl font-semibold text-white">R$ 850,00</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Outros</p>
                    <p className="mt-4 text-3xl font-semibold text-white">R$ 1.340,00</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                  <h3 className="text-lg font-semibold text-white">Resumo rápido</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    A visão geral traz o valor total das despesas e ajuda a identificar onde está o maior gasto. Use o menu para navegar entre utilidades pessoais e investimentos em educação.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Categoria</p>
                    <p className="mt-4 text-xl font-semibold text-white">{activeItem.label}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Próxima revisão</p>
                    <p className="mt-4 text-xl font-semibold text-white">Em 30 dias</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                  <h3 className="text-lg font-semibold text-white">Detalhes</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {activeItem.subItems ? "Selecione uma despesa específica para ver mais informações." : "Veja abaixo os dados da despesa selecionada."}
                  </p>
                  {activeItem.subItems ? (
                    <div className="mt-5 space-y-3">
                      {activeItem.subItems.map((sub) => (
                        <div key={sub.id} className="rounded-2xl bg-slate-950/70 p-4 text-slate-200">
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-semibold">{sub.label}</p>
                            <span className="text-slate-400">{sub.amount}</span>
                          </div>
                          <p className="mt-2 text-sm text-slate-400">{sub.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
