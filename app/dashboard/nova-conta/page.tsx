"use client";

import ExpenseForm from "@/components/forms/ExpenseForm";
import SelectForm from "@/components/forms/SelectForm";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type LoginFormValues = {
  nome: string;
  valor: number;
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
    formState: {
      errors,
      isSubmitting,
    },
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

    const response = await fetch("/api/dashboard/nova-conta", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const result = await response.json();

    alert(result.message);
  }

  return (

    <div className="p-6 rounded-3xl bg-white/5">

      <h1 className="text-2xl font-semibold">
        Nova conta de despesa
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
      >

        {/* NOME */}
        <div className="text-white">

          <label>
            Nome da despesa
          </label>

          <ExpenseForm
            nome="nome"
            register={register("nome", {
              required: true,
              maxLength: 20,
            })}
          />

        </div>


        {/* VALOR */}
        <div className="text-white">

          <label>
            Valor
          </label>

          <ExpenseForm
          nome="valor"
          type="number"
          register={register("valor", {
            required: true,
            valueAsNumber: true,
          })}
        />

        </div>


        {/* CATEGORIA */}
        <div className="text-white">

          <label>
            Categoria
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

          <label>
            Data
          </label>

          <ExpenseForm
            type="date"
            nome="data"
            register={register("data", {
              required: true,
            })}
          />

        </div>


        {/* DESCRIÇÃO */}
        <div className="text-white">

          <label>
            Descrição
          </label>

          <ExpenseForm
            nome="descricao"
            register={register("descricao", {
              required: true,
              maxLength: 100,
            })}
          />

        </div>


        {/* BOTÃO */}
        <button
          type="submit"
          className="mt-6 rounded-xl bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-400"
        >
          Salvar despesa
        </button>

      </form>

    </div>
  );
}