import Link from "next/link";
import Image from "next/image";

type Props = {
  onLogout: () => void;
};

export default function DashboardHeader({ onLogout }: Props) {
  return (
    <header className="rounded-3xl bg-slate-900/80 p-6 border border-white/10 w-full flex items-center justify-between">
       <div className="w-40">
       <Image
                className="  "
                src="/assets/gerenciando-contas-logo-horizontal.png"
                alt="Your Company"
                  width={400}
                  height={200}
              />
       </div>
       <div className="inline-block justify-between w-60">
     
          <Link
            href="/dashboard/nova-conta"
            className="mt-4 inline-block rounded-xl bg-cyan-500 px-4 py-2 "
            >
            Nova Despesa
          </Link>
          <button
            onClick={onLogout}
            className="mt-4 ml-4 bg-red-500 px-4 py-2 rounded-xl mr-5 "
          >
            Sair
          </button>
       </div>
    </header>
  );
}