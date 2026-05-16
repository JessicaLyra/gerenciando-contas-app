"use client";

import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (

    <AuthLayout title="Login">

      <form className="space-y-6">

        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <AuthButton text="Entrar" />

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