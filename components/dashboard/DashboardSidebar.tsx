"use client";

import type { MenuItem } from "@/types/menu";
import { iconMap } from "@/utils/iconMap";
import { useState } from "react";
import { Plus } from "lucide-react";

type Props = {
  menu: MenuItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export default function DashboardSidebar({
  menu,
  activeId,
  onChange,
}: Props) {

  return (
    <nav className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/80 p-5">

      {menu.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : null;
        const [openMenus, setOpenMenus] = useState<string[]>([]);
        function toggleMenu(id: string) {
          setOpenMenus((prev) =>
            prev.includes(id)
              ? prev.filter((i) => i !== id)
              : [...prev, id]
          );
        }
        
        return (
          <div key={item.id}>

            {/* BOTÃO PRINCIPAL */}
            <button
                onClick={() => {
                  if (item.id === "total") {
                    onChange(item.id);
                    return;
                  }

                  toggleMenu(item.id);
                }}            className={`flex w-full justify-between rounded-2xl px-4 py-3 hover:bg-indigo-500 transition duration-300 ease-in-out cursor-pointer ${
                activeId === item.id
                  ? "bg-indigo-700 text-white"
                  : "bg-slate-950/60 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon size={18} />}
                <span>{item.label}</span>
                <span className="ml-2 text-xs text-slate-400">
                  {item.subItems ? item.subItems.length : ""}
                </span>
              </div>

              {item.amount && <span>{item.amount}</span>}
            </button>

            {/* SUB ITENS */}
            {item.subItems && openMenus.includes(item.id) && (
              <div className="mt-2 space-y-2 px-2">

                {item.subItems.map((sub) => {
                  const SubIcon =
                    sub.icon && sub.icon in iconMap
                      ? iconMap[sub.icon as keyof typeof iconMap]
                      : iconMap.despesa;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => onChange(sub.id)}
                      className={`flex items-center gap-2 w-full rounded-xl px-4 py-2 text-sm cursor-pointer ${
                        activeId === sub.id
                          ? "bg-slate-700 text-white"
                          : "bg-slate-950/50 text-slate-300"
                      }`}
                    >
                      {SubIcon && <SubIcon size={16} />}
                      <span>{sub.label}</span>
                      
                    </button>
                  );
                })}

              </div>
            )}

          </div>
        );
      })}

    </nav>
  );
}