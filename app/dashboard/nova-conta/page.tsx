"use client";

import ExpenseForm from "@/components/forms/ExpenseForm";
import SelectForm from "@/components/forms/SelectForm";
import AuthButton from "@/components/AuthButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";


import Image from "next/image";

import {
  User,
  Banknote,
  ChartBarStacked,
  CalendarClock,
  NotepadText,
  Save,
  Undo2
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

    // Verifica se todos os campos foram preenchidos
    if (
      !data.nome ||
      !data.valor ||
      !data.categoriaId ||
      !data.data ||
      !data.descricao
    ) {
      toast.warning("Preencha todos os campos", {
        description: "Todos os campos são obrigatórios para cadastrar a despesa.",
        style: {
          background: "#451a03",
          border: "1px solid #f59e0b",
          color: "#fff",
        },
      });

      return;
    }


    const response = await fetch("/api/dashboard/nova-conta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
  toast.error("Erro ao cadastrar despesa", {
    description:
      result.message || "Não foi possível salvar a despesa. Tente novamente.",
    style: {
      background: "#450a0a",
      border: "1px solid #ef4444",
      color: "#fff",
    },
  });

  return;
}

toast.success("Despesa cadastrada com sucesso!", {
  description: "A despesa foi adicionada ao seu controle financeiro.",
  style: {
    background: "#052e16",
    border: "1px solid #22c55e",
    color: "#fff",
  },
});
  }
  return (

    <div className="w-full max-w-full overflow-hidden rounded-3xl bg-slate-900 p-4 sm:p-6">
      <Image
        className="mx-auto h-auto w-40 sm:w-auto"
        src="/assets/gerenciando-contas-logo.png"
        alt="Logo"
        width={200}
        height={100}
      />

      <h1 className="mt-10 text-center text-2xl font-semibold">
        Nova conta de despesa
      </h1>

      <div className="mt-8 w-full max-w-3xl mx-auto rounded-md px-0 sm:px-3 py-2">
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
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
    
          {/* BOTÃO */}
            <button
              type="submit"
              className="
                flex items-center justify-center gap-2
                rounded-full
                px-5 py-3
                gradient-primary
                transition-all duration-300 ease-in-out
                hover:brightness-130
                cursor-pointer
                w-full sm:w-auto
              "
              
            >
            <Save size={20} /> Salvar despesa 
            </button>
            <Link
              href="/dashboard"
              className="
                flex items-center justify-center gap-2
                px-5 py-3
                button-transparent
                rounded-full
                w-full sm:w-auto
              "
            >
            <Undo2 size={20} /> Voltar para o dashboard
            </Link>
         </div>
      
        </form>

      </div>

    </div>
  );
}