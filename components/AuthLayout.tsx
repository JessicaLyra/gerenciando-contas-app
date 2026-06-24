"use client";
import Image from "next/image";


// Tipagem das propriedades que o componente vai receber
type AuthLayoutProps = {

  // Título da tela
  title: string;
  descricao?: string;
  // Conteúdo interno do componente
  // Exemplo:
  // formulário de login
  // formulário de cadastro
  children: React.ReactNode;
   
};

// Componente reutilizável
export default function AuthLayout({
  title,
  children,
  descricao,
}: AuthLayoutProps) {

  return (

    // Container principal da tela
    <div className="flex min-h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-[linear-gradient(rgba(2,7,35,.85),rgba(2,7,35,.90)),url('/assets/bg-login.jpg')]
bg-cover
bg-center
bg-no-repeat">

      {/* Área do título */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto  w-auto"
          src="/assets/gerenciando-contas-logo.png"
          alt="Your Company"
            width={200}
            height={150}
        />
          <div className="mx-auto mt-3 h-px w-40 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

        <h2 className="mt-10 text-center text-lg font-bold tracking-tight text-white">
          
          {title}
        </h2>
        <h3 className="mt-2 text-center text-sm text-gray-500">
          {descricao}
        </h3>
      </div>

      {/* Card do formulário */}
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md bg-[rgba(255,255,255,0.04)] rounded-lg px-8 py-6">

        {/* Aqui será renderizado:
            login OU cadastro */}
              
        {children}

      </div>

    </div>
  );
}