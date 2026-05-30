"use client";

import ExpenseForm from "@/components/forms/ExpenseForm";
import SelectForm from "@/components/forms/SelectForm";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Image from "next/image";

import {
  User,
  Banknote,
  ChartBarStacked,
  CalendarClock,
  NotepadText
} from "lucide-react";

type LoginFormValues = {
  nome: string;
  valor: string;
  categoriaId: string;
  data: string;
  descricao: string;
};

type Categoria = {
  id: number;
  nome: string;
};

export default function NovaContaPage() {

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormValues>();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {

    async function carregarCategorias() {

      const response = await fetch("/api/categorias");

      const data = await response.json();

      setCategorias(data);
    }

    carregarCategorias();

  }, []);

  async function onSubmit(data: LoginFormValues) {
    alert("submit executado");

  console.log(data);

  const valorFormatado = Number(
    data.valor
      .toString()
      .replace(/\./g, "")
      .replace(",", ".")
  );

  const payload = {
    ...data,
    valor: valorFormatado,
  };

  const response = await fetch("/api/dashboard/nova-conta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  alert(result.message);
}

  return (

    <div className="p-6 rounded-3xl bg-slate-900">

      <Image
        className="mx-auto w-auto"
        src="/assets/gerenciando-contas-logo.png"
        alt="Logo"
        width={200}
        height={100}
      />

      <h1 className="mt-10 text-center text-2xl font-semibold">
        Nova conta de despesa
      </h1>

      <div className="mt-10 lg:mx-auto w-5xl rounded-md px-3 py-2">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
        >

          {/* NOME */}
          <div className="text-white">

            <ExpenseForm
              label="Nome da despesa"
              icon={<User size={20} />}
              register={register("nome", {
                required: true,
                maxLength: 50,
              })}
            />

          </div>

          {/* VALOR */}
          <div className="text-white">

            <ExpenseForm
              label="Valor"
              mask="currency"
              type="text"
              icon={<Banknote size={20} />}
              register={register("valor", {
                required: true,
                
              })}
            />

          </div>

          {/* CATEGORIA */}
          <div className="text-white">

            <label className="inline-flex items-center font-medium text-gray-100">

              <span className="text-violet-500">
                <ChartBarStacked size={20} />
              </span>

              <span className="ml-2">
                Categoria
              </span>

            </label>

            <SelectForm
              register={register("categoriaId", {
                required: true,
              })}
            >

              <option
                className="bg-slate-900 text-white"
                value=""
              >
                Selecione
              </option>

              {categorias.map((categoria) => (

                <option
                  key={categoria.id}
                  className="bg-slate-900 text-white"
                  value={categoria.id}
                >
                  {categoria.nome}
                </option>

              ))}

            </SelectForm>

          </div>

          {/* DATA */}
          <div className="text-white">

            <ExpenseForm
              label="Data"
              type="date"
              icon={<CalendarClock size={20} />}
              register={register("data", {
                required: true,
              })}
            />

          </div>

          {/* DESCRIÇÃO */}
          <div className="text-white">

            <ExpenseForm
              label="Descrição"
              icon={<NotepadText size={20} />}
              register={register("descricao", {
                required: true,
                maxLength: 100,
              })}
            />

          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="
              mt-6 rounded-xl
              bg-violet-600
              px-4 py-2
              text-white
              hover:bg-violet-500
            "
          >
            Salvar despesa
          </button>

        </form>

      </div>

    </div>
  );
}