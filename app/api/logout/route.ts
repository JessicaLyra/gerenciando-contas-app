import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {

  // Acessa cookies
  const cookieStore = await cookies();

  // Remove token
  cookieStore.delete("token");

  return NextResponse.json({
    message: "Logout realizado",
  });
}