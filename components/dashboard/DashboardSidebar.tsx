"use client";

import type { MenuItem } from "@/types/menu";
import { iconMap } from "@/utils/iconMap";
import { useState } from "react";

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
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  function toggleMenu(id: string) {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
      <nav className="w-full min-w-0 max-w-full overflow-hidden space-y-5 rounded-3xl border border-white/10 bg-slate-900/80 p-4 sm:p-5">      {menu.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : null;
        const isCategoryActive =
          activeId === item.id ||
          (item.id.startsWith("categoria-") &&
            activeId === `categoria-total-${item.id.replace("categoria-", "")}`);
        const despesasCount = item.subItems
          ? item.subItems.filter((sub) => !sub.id.startsWith("categoria-total-")).length
          : 0;

        return (
          <div key={item.id}>
            <button
              onClick={() => {
                if (item.id === "total") {
                  onChange(item.id);
                  return;
                }

                onChange(item.id);
                toggleMenu(item.id);
              }}
              className={`flex w-full min-w-0 items-center justify-between rounded-2xl px-4 py-3 transition duration-300 ease-in-out cursor-pointer hover:bg-indigo-600 hover:text-white ${                isCategoryActive
                  ? "bg-indigo-700 text-white"
                  : "bg-slate-950/60 text-slate-300"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                {Icon && <Icon size={18} />}
                <span className="truncate">{item.label}</span>
                {despesasCount > 0 && (
                  <span className="ml-2 text-xs text-slate-400">
                    {despesasCount}
                  </span>
                )}
              </div>

              {item.amount && <span>{item.amount}</span>}
            </button>

            {item.subItems && openMenus.includes(item.id) && (
              <div className="mt-2 space-y-2 px-2">
                {item.subItems.map((sub) => {
                  const isSummary = sub.id.startsWith("categoria-total-");
                  const SubIcon =
                    sub.icon && sub.icon in iconMap
                      ? iconMap[sub.icon as keyof typeof iconMap]
                      : iconMap.despesa;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => onChange(sub.id)}
                      className={`flex items-center gap-2 w-full rounded-xl border px-4 py-2 text-sm cursor-pointer transition duration-200 ease-in-out ${
                        isSummary
                          ? "border-0 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200"
                          : activeId === sub.id
                            ? "border-slate-700 bg-slate-700 text-white"
                            : "border-transparent bg-slate-950/50 text-indigo-400 hover:border-slate-600 hover:bg-slate-800/80 hover:text-white"
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