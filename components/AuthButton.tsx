type AuthButtonProps = {

  // Texto do botão
  text: string;

  // Tipo do botão HTML
  type?: "button" | "submit";

  // Estado de loading
  loading?: boolean;

  // Desabilitado
  disabled?: boolean;
};

export default function AuthButton({
  text,
  type = "button",
  loading = false,
  disabled = false,
}: AuthButtonProps) {

  return (

    <button
      type={type}

      disabled={disabled || loading}

      className="
        flex w-full justify-center rounded-md
        bg-indigo-500 px-3 py-2
        text-sm font-semibold text-white

        hover:bg-indigo-400

        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >

      {/* Se estiver carregando */}
      {loading ? "Carregando..." : text}

    </button>
  );
}