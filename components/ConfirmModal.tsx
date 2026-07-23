"use client";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-md rounded-2xl border border-violet-500/30 bg-slate-900 p-6 shadow-2xl">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-3 text-slate-300">
          {description}
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-600 px-5 py-2 text-white transition hover:bg-slate-800"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
          >
            Excluir
          </button>

        </div>

      </div>

    </div>
  );
}