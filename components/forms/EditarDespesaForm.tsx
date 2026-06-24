"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import ExpenseForm from "@/components/forms/ExpenseForm";
import SelectForm from "@/components/forms/SelectForm";


import {
  User,
  Banknote,
  ChartBarStacked,
  CalendarClock,
  NotepadText,
  UndoDot,
  Trash2,
  Save

} from "lucide-react";

type Props = {
  despesa: any;
  categorias: any[];
};

type FormValues = {
  nome: string;
  valor: string;
  categoriaId: string;
  data: string;
  descricao: string;
};

export default function EditarDespesaForm({
  despesa,
  categorias,
}: Props) {

  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      nome: despesa.nome,
      valor: String(despesa.valor),
      categoriaId: String(despesa.categoriaId),
      data: new Date(despesa.data)
        .toISOString()
        .split("T")[0],
      descricao: despesa.descricao,
    },
  });

  async function onSubmit(data: FormValues) {

    try {

      const valorFormatado = Number(
        data.valor
          .toString()
          .replace(/\./g, "")
          .replace(",", ".")
      );

      const response = await fetch(
        "/api/dashboard/editar-despesa",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: despesa.id,
            ...data,
            valor: valorFormatado,
          }),
        }
      );

      const result = await response.json();

      alert(result.message);

      router.push("/dashboard");

      router.refresh();

    } catch (error) {

      console.error(error);

      alert("Erro ao atualizar despesa");

    }

  }

  async function excluirDespesa() {

  const confirmar = confirm(
    "Deseja realmente excluir esta despesa?"
  );

  if (!confirmar) return;

  try {

    const response = await fetch(
      "/api/dashboard/excluir-despesa",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: despesa.id,
        }),
      }
    );

    const result = await response.json();

    alert(result.message);

    router.push("/dashboard");

    router.refresh();

  } catch (error) {

    console.error(error);

    alert("Erro ao excluir despesa");

  }

}

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <ExpenseForm
        label="Nome da despesa"
        icon={<NotepadText size={25} />}
        register={register("nome")}
      />

      <ExpenseForm
        label="Valor"
        icon={<Banknote size={25} />}
        register={register("valor")}
      />

      <div>

        <label className="inline-flex items-center font-medium text-gray-100">
           <span className="text-violet-500">
            <ChartBarStacked size={20} />
        </span>
          <span className="ml-2">Categoria</span>
        </label>

        <SelectForm
          register={register("categoriaId")}
        >
          {categorias.map((categoria) => (
            <option
              key={categoria.id}
              value={categoria.id}
              className="bg-slate-900 text-white"
            >
              {categoria.nome}
            </option>
          ))}
        </SelectForm>

      </div>

      <ExpenseForm
        label="Data"
        icon={<CalendarClock size={25} />}
        type="date"
        register={register("data")}
      />

      <ExpenseForm
        label="Descrição"
        icon={<NotepadText size={25} />}
        register={register("descricao")}
      />
      <div className="flex inline-flex w-full mt-4 gap-8">
     
      <AuthButton
        icon={<UndoDot size={20} />}
        type="button"
        text="Voltar para o dashboard"
        variant="secondary"
        onClick={() => router.push("/dashboard")}
      />
      <AuthButton
        type="button"
        text="Excluir despesa"
        variant="danger"
        icon={<Trash2 size={20} />}
        onClick={excluirDespesa}
      />
      
      
       <AuthButton
        icon={<Save size={20} />}
        type="submit"
        text="Salvar alterações"
      />
      
      </div>
    </form>
    
    </>
  );
}