"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, LogOut, Menu, X } from "lucide-react";
import { gradients } from "@/lib/styles";

type Props = {
  onLogout: () => void;
};

export default function DashboardHeader({ onLogout }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative rounded-3xl bg-slate-900/80 border border-white/10 p-6">

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Image
          src="/assets/gerenciando-contas-logo-horizontal.png"
          alt="Gerenciando Contas"
          width={300}
          height={120}
          className="w-56 md:w-72 h-auto"
        />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">

          <Link
            href="/dashboard/nova-conta"
            className={`${gradients.primary}
              px-6 py-3 rounded-full
              hover:brightness-110
              transition-all duration-300`}
          >
            <Plus className="inline mr-2" />
            Nova Despesa
          </Link>

          <button
            onClick={onLogout}
            className="
              px-6 py-3
              rounded-full
              bg-gradient-to-r
              from-[#D9465F]
              to-[#EF4444]
              hover:from-[#E2556B]
              hover:to-[#F87171]
              transition-all duration-300
              cursor-pointer
            "
          >
            <LogOut className="inline mr-2" />
            Sair
          </button>

        </div>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden
            p-2
            rounded-xl
            border border-violet-500/30
            bg-slate-800
            hover:bg-slate-700
            transition
          "
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Menu Mobile */}
      {menuOpen && (

        <div
          className="
            absolute
            right-6
            top-24
            w-64
            rounded-2xl
            border
            border-violet-500/20
            bg-slate-900
            shadow-2xl
            p-4
            flex
            flex-col
            gap-3
            md:hidden
            z-50
          "
        >

          <Link
            href="/dashboard/nova-conta"
            onClick={() => setMenuOpen(false)}
            className={`
              ${gradients.primary}
              rounded-xl
              px-4
              py-3
              text-center
            `}
          >
            <Plus className="inline mr-2" />
            Nova Despesa
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              onLogout();
            }}
            className="
              rounded-xl
              px-4
              py-3
              bg-gradient-to-r
              from-[#D9465F]
              to-[#EF4444]
              hover:from-[#E2556B]
              hover:to-[#F87171]
              transition-all
            "
          >
            <LogOut className="inline mr-2" />
            Sair
          </button>

        </div>

      )}

    </header>
  );
}