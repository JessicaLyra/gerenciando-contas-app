"use client";

import type { MenuItem } from "@/types/menu";

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
      {menu.map((item) => (
        <div key={item.id}>
          {/* botão principal */}
          <button
            onClick={() => onChange(item.id)}
            className={`flex w-full justify-between rounded-2xl px-4 py-3  hover:bg-indigo-500 transition duration-300 ease-in-out ${
              activeId === item.id ? "bg-indigo-700 text-white " : "bg-slate-950/60 text-slate-300"
            }`}
          >
            <span>{item.label}</span>
            {item.amount && <span>{item.amount}</span>}
          </button>

          {/* sub itens */}
          {item.subItems && (
            <div className="mt-2 space-y-2 px-2">
              {item.subItems.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => onChange(sub.id)}
                  className={`w-full rounded-xl px-4 py-2 text-sm ${
                    activeId === sub.id ? "bg-slate-700 text-white" : "bg-slate-950/50 text-slate-300"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}