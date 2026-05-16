"use client";

// Tipagem das propriedades que o componente vai receber
type AuthLayoutProps = {

  // Título da tela
  title: string;

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
}: AuthLayoutProps) {

  return (

    // Container principal da tela
    <div className="flex min-h-screen w-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">

      {/* Área do título */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          {title}
        </h2>

      </div>

      {/* Card do formulário */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/5 rounded-md px-3 py-6">

        {/* Aqui será renderizado:
            login OU cadastro */}
        {children}

      </div>

    </div>
  );
}