"use client";

type AuthInputProps = {

  // Texto da label
  label: string;

  // Tipo do input
  type?: string;

  // Valor do input
  value?: string;

  // Placeholder
  placeholder?: string;

  // Evento onChange
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Registro do react-hook-form
  register?: any;
};

export default function AuthInput({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  register,
}: AuthInputProps) {

  return (

    <div>

      {/* Label */}
      <label className="block text-sm/6 font-medium text-gray-100">
        {label}
      </label>

      {/* Input */}
      <div className="mt-2">

        <input
          type={type}

          value={value}

          placeholder={placeholder}

          onChange={onChange}

          // React Hook Form
          {...register}

          className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
        />

      </div>

    </div>
  );
}