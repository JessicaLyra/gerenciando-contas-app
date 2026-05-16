//
// Importamos a função "redirect"
// diretamente do Next.js.
//
// Ela serve para redirecionar o usuário
// automaticamente para outra rota/página.
//

import { redirect } from "next/navigation";

export default function Home() {

  //
  // Esta é a página principal da aplicação ("/")
  //
  // Quando alguém acessar:
  // http://localhost:3000/
  //
  // o Next.js executará o redirect
  // e enviará o usuário para:
  // /login
  //

  redirect("/login");

}