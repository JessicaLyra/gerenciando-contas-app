catch (error: any) {
  console.error("🔥 ERRO COMPLETO:");
  console.error(error);
  console.error(error?.stack);

  return NextResponse.json(
    {
      message: "Erro interno no servidor",
      error: error?.message,
    },
    { status: 500 }
  );
}