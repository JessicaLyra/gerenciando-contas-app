"use client";

type AuthInputProps = {

  // Texto da label
  label: string;

  // Tipo do input
  type?: string;

  // Placeholder
  placeholder?: string;

  // Registro do react-hook-form
  register?: any;

  // Mensagem de erro
  error?: string;
};

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  register,
  error,
}: AuthInputProps) {

  return (

    <div>

      {/* Label */}
      <label className="block text-sm font-medium text-gray-100">
        {label}
      </label>

      {/* Input */}
      <div className="mt-2">

        <input
          type={type}
          placeholder={placeholder}

          // Props do react-hook-form
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

      {/* Mensagem de erro */}
      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}