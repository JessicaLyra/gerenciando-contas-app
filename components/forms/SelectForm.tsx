"use client";

type SelectFormProps = {

  register: any;

  children: React.ReactNode;
};

export default function SelectForm({

  register,

  children,

}: SelectFormProps) {

  return (

    <select

      className="
        block w-full rounded-md bg-white/5   px-3 py-2 text-white   outline outline-1 outline-white/10   placeholder:text-gray-500   focus:outline-2 focus:outline-indigo-500
      "

      {...register}
    >

      {children}

    </select>
  );
}