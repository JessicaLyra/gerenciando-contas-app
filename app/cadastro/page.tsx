"use client";

// React Hook Form
import { useForm } from "react-hook-form";

// Link do Next
import Link from "next/link";

// Componentes reutilizáveis
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";

export default function CadastroForm() {

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Função executada no submit
  const onSubmit = async (data: any) => {

    // Verifica se as senhas coincidem
    if (data.senha !== data.confirmarSenha) {

      alert("As senhas não coincidem");

      return;
    }

    // Envia para API
    const response = await fetch("/api/cadastro", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        usuario: data.usuario,
        email: data.email,
        senha: data.senha,
      }),
    });

    // Converte resposta
    const result = await response.json();

    // Exibe mensagem
    alert(result.message);
  };

  return (

    // Layout reutilizável
    <AuthLayout title="Preencha os campos">

      {/* Formulário */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >

        {/* Usuário */}
        <AuthInput

          label="Usuário"

          register={register("usuario", {

            required: true,

            maxLength: 20,
          })}
        />

        {/* Email */}
        <AuthInput

          label="Email"

          type="email"

          register={register("email", {

            required: true,

            pattern: /^\S+@\S+\.\S+$/,
          })}
        />

        {/* Senha */}
        <AuthInput

          label="Senha"

          type="password"

          register={register("senha", {

            required: true,

            minLength: 6,
          })}
        />

        {/* Confirmar senha */}
        <AuthInput

          label="Confirmar senha"

          type="password"

          register={register("confirmarSenha", {

            required: true,

            minLength: 6,
          })}
        />

        {/* Botão */}
        <button
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400"
        >
          Cadastrar
        </button>

        {/* Link login */}
        <div className="mt-10 mb-5">

          <p className="text-gray-100 text-center">

            Já tem cadastro?{" "}

            <Link
              href="/login"
              className="text-blue-400"
            >
              Fazer login
            </Link>

          </p>

        </div>

      </form>

    </AuthLayout>
  );
}