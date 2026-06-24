import { prisma, Prisma } from "@/lib/prisma";
import EditarDespesaForm from "@/components/forms/EditarDespesaForm";
import Image from "next/image";

type Props = {
  params: Promise<{ 
    id: string 
}>;
};

export default async function EditarDespesaPage({ params }: Props) {
    // recebe o id vindo da URL
    const { id } = await params;

    // Buscar a despesa pelo ID
    const despesa = await  prisma.despesa.findUnique({
        where: { id: Number(id) },
    });     

    const categorias = await prisma.categoria.findMany({
       orderBy: {
          nome: "asc",
      },
    });

    if (!despesa) {
        return 
        <div>Despesa não encontrada</div>;
    }   
    return (
      

        <div className="p-6 rounded-3xl bg-slate-900">

          <Image
            className="mx-auto w-auto"
            src="/assets/gerenciando-contas-logo.png"
            alt="Logo"
            width={100}
            height={50}
          />

          <h1 className="mt-10 text-center text-2xl font-semibold">
            Editar despesa
          </h1>

          <div className="mt-10 lg:mx-auto w-5xl rounded-md px-3 py-2">

            <EditarDespesaForm
              despesa={{
                ...despesa,
                valor: Number(despesa.valor),
              }}
              categorias={categorias}
            />

          </div>

        </div>
    );
}