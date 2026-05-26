"use client";


type ExpenseFormProps = {

  nome: string;
  type?: string;
  placeholder?: string;
  register?: any;
  error?: string;
};

export default function ExpenseForm({
    nome,
    type = "text",
    placeholder,
    register,
    error,
}: ExpenseFormProps) {

    return (
        <div>
            <label className="block text-sm font-medium text-gray-100">
                {nome}
            </label>
            <div className="mt-2">

            <input
              type={type}
              step={type === "number" ? "0.01" : undefined}
              placeholder={placeholder}
              {...register}
            

            className="
                block w-full rounded-md bg-white/5
                px-3 py-2 text-white
                outline outline-1 outline-white/10
                placeholder:text-gray-500
                focus:outline-2 focus:outline-indigo-500
            "
            />

      </div>
       {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}

        </div>    
            
        )}
