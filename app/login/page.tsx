"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

type LoginFormData = {

  email: string;
  senha: string;
};

export default function LoginPage() {

  // Router do Next.js
  const router = useRouter();

  // React Hook Form
  const {

    register,
    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },

  } = useForm<LoginFormData>();

  // Função de login
  async function handleLogin(data: LoginFormData) {

    try {

      // Requisição para API
      const response = await fetch("/api/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      // Resposta da API
      const result = await response.json();

      // Se der erro
      if (!response.ok) {

        alert(result.message);

        return;
      }

      // Login OK
      router.push("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Erro ao fazer login");
    }
  }

  return (

    <AuthLayout title="Login">

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-6"
      >

        {/* EMAIL */}
        <AuthInput
          label="Email"
          type="email"

          register={register("email", {

            required: "Digite seu email",
          })}

          error={errors.email?.message}
        />

        {/* SENHA */}
        <AuthInput
          label="Senha"
          type="password"

          register={register("senha", {

            required: "Digite sua senha",
          })}

          error={errors.senha?.message}
        />

        {/* BOTÃO */}
        <AuthButton
          text="Entrar"
          type="submit"
          loading={isSubmitting}
        />

        {/* LINK CADASTRO */}
        <p className="text-center text-white">

          Ainda não tem cadastro?{" "}

          <Link
            href="/cadastro"
            className="text-blue-400"
          >
            Criar conta
          </Link>

        </p>

      </form>

    </AuthLayout>
  );
}