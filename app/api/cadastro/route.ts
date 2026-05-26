import { NextResponse } from "next/server";

export async function POST() {
  console.log("🔥 API CADASTRO FUNCIONOU");

  return NextResponse.json({
    message: "API funcionando",
  });
}