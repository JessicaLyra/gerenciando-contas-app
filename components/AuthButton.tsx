import { gradients } from "@/lib/styles";

type AuthButtonProps = {

  // Texto do botão
  text: string;

  // Tipo do botão HTML
  type?: "button" | "submit";

  // Estado de loading
  loading?: boolean;

  // Desabilitado
  disabled?: boolean;

  // Ícone opcional
  icon?: React.ReactNode;

  variant?: "primary" | "danger" | "secondary";

   // função opcional
  onClick?: () => void;

};

export default function AuthButton({
  text,
  type = "button",
  loading = false,
  disabled = false,
  icon,
  onClick,
  variant = "primary",
}: AuthButtonProps) {

const buttonColor =
  variant === "danger"
    ? "bg-gradient-to-r from-[#D9465F] to-[#EF4444] hover:from-[#E2556B] hover:to-[#F87171]   shadow-[0_0_20px_rgba(239,68,68,.25)]"
    : variant === "secondary"
      ? "bg-[#c6c59d00] hover:bg-[#CBD5E0] text-[#4A5568] border border-[#A0AEC0] "
      : `${gradients.primary} hover:brightness-130 shadow-[0_0_20px_rgba(139,92,246,.25)]`;


  return (

    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex w-full justify-center rounded-4xl
        px-4 py-4
        text-sm font-semibold  transition-all duration-300 ease-in-out 
        ${buttonColor}
        disabled:opacity-50
        disabled:cursor-not-allowed cursor-pointer
      `}
    >
      <span className=" mr-2"> 
          {icon}
        </span> {loading ? "Carregando..." : text}
    </button>
    
  );
}