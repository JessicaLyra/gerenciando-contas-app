import Link from "next/link";
import Image from "next/image";
import { Plus, LogOut } from 'lucide-react';
import { gradients } from "@/lib/styles";

type Props = {
  onLogout: () => void;
};

export default function DashboardHeader({ onLogout }: Props) {
  return (
    <header className="rounded-3xl bg-slate-900/80 p-6 border border-white/10 w-full md:flex sm:inline-block items-center justify-between">
       <div className="md:w-50 sm:w-full ">
       <Image
                className="  "
                src="/assets/gerenciando-contas-logo-horizontal.png"
                alt="Your Company"
                  width={400}
                  height={200}
              />
       </div>
       <div className=" md:inline-block sm:flex md:justify-between md:w-80 sm:w-full md:float-end ">
     
          <Link
            href="/dashboard/nova-conta"
            className={`${gradients.primary} p-4 rounded-4xl   hover:brightness-110
  hover:scale-[1.02]
  transition-all duration-300 ease-in-out`}
            >
            <Plus className="mr-2 inline" />Nova Despesa
          </Link>
          <button
            onClick={onLogout}
            className="mt-4 ml-4 bg-gradient-to-r from-[#D9465F] to-[#EF4444]
hover:from-[#E2556B] hover:to-[#F87171]
transition-all duration-300 ease-in-out
            px-9 py-3
            rounded-4xl
            shadow-[0_0_20px_rgba(239,68,68,.25)]
            cursor-pointer"
          >
            <LogOut className="mr-2 inline" />Sair
          </button>
       </div>
    </header>
  );
}