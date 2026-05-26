import Link from "next/link";

type Props = {
  onLogout: () => void;
};

export default function DashboardHeader({ onLogout }: Props) {
  return (
    <header className="rounded-3xl bg-slate-900/80 p-6 border border-white/10">

      <h1 className="text-3xl font-semibold">
        Minha conta de despesas
      </h1>

      <button
        onClick={onLogout}
        className="mt-4 bg-red-500 px-4 py-2 rounded-xl mr-5"
      >
        Sair
      </button>
      <Link
        href="/dashboard/nova-conta"
        className="mt-4 inline-block rounded-xl bg-gray-500 px-4 py-2"
        >
        Nova Despesa
      </Link>

    </header>
  );
}