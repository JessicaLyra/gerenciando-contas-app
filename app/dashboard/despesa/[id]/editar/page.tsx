import { prisma} from "@/lib/prisma";
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
      
<div className="w-full max-w-full overflow-hidden rounded-3xl bg-slate-900 p-4 sm:p-6">

  <Image
    className="mx-auto h-auto w-32 sm:w-auto"
    src="/assets/gerenciando-contas-logo.png"
    alt="Logo"
    width={100}
    height={50}
  />

  <h1 className="mt-6 text-center text-xl font-semibold sm:mt-10 sm:text-2xl">
    Editar despesa
  </h1>


  <div className="mt-8 w-full max-w-3xl rounded-md px-0 py-2 sm:mx-auto sm:px-3">

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