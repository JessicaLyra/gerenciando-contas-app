"use client";
import { MenuItem } from "@/types/menu";

// Aqui ficam os dados fixos (depois pode vir de API)

export const menu: MenuItem[] = [
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
    {
    id: "lazer",
    label: "Lazer",
    description: "Gastos com entretenimento.",
    subItems: [
        { id: "lazer-netflix", label: "Netflix", description: "Assinatura mensal de streaming.", amount: "R$ 45,00" },
        { id: "lazer-gamepass", label: "Game Pass", description: "Assinatura mensal de gaming.", amount: "R$ 45,00" },

    ],   
    }
];

