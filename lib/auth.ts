import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);

// Criar token
export async function createToken(payload: object) {

  const token = await new SignJWT(payload)

    .setProtectedHeader({
      alg: "HS256",
    })

    .setIssuedAt()

    .sign(secret);

  return token;
}

// Verificar token
export async function verifyToken(token: string) {

  try {

    const { payload } = await jwtVerify(
      token,
      secret
    );

    return payload;

  } catch {

    return null;
  }
}