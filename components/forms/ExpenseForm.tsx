"use client";

type ExpenseFormProps = {
  nome: string;
  label: string;
  type?: string;
  placeholder?: string;
  register?: any;
  error?: string;
  icon?: React.ReactNode;
  mask?: "currency";
};

// Função que transforma:
//
// 1      -> 0,01
// 12     -> 0,12
// 123    -> 1,23
// 1234   -> 12,34
// 12345  -> 123,45
//
function formatCurrency(value: string) {

  // Remove tudo que não for número
  const numbers = value.replace(/\D/g, "");

  // Divide por 100 para criar os centavos
  const amount = Number(numbers) / 100;

  // Formata para padrão brasileiro
  return amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

}

export default function ExpenseForm({
  nome,
  label,
  type = "text",
  placeholder,
  register,
  error,
  icon,
  mask,
}: ExpenseFormProps) {

  return (
    <div>

      {/* Label */}
      <label className="inline-flex items-center font-medium text-gray-100">

        <span className="text-violet-500">
          {icon}
        </span>

        <span className="ml-2">
          {label}
        </span>

      </label>

      <div className="mt-2">

        <input
          type={type}
          placeholder={placeholder}
          step={type === "number" ? "0.01" : undefined}

          {...register}

        onInput={(e) => {

          if (mask === "currency") {

            const target = e.target as HTMLInputElement;

            const numbers = target.value.replace(/\D/g, "");

            const amount = Number(numbers) / 100;

            target.value = amount.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }
        }}


          className="
            block w-full rounded-md bg-white/5
            px-3 py-2 text-white
            outline outline-1 outline-white/10
            placeholder:text-gray-500
            focus:outline-2 focus:outline-violet-500
          "
        />

      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}