import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch  {
    return "";
  }
}

export async function verifyTokenNonCryto(token: string): Promise<boolean> {
  const [encodedPayload, signature] = token.split(".");
  
  // const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());
  
  const encoder = new TextEncoder();
  const secretKey = encoder.encode(process.env.JWT_SECRET);

  const key = await crypto.subtle.importKey(
    "raw",
    secretKey,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["verify"]
  );

  const data = encoder.encode(`${encodedPayload}`);
  const signatureBuffer = Buffer.from(signature, "base64url");

  // Verify the signature
  const isValid = await crypto.subtle.verify("HMAC", key, signatureBuffer, data);
  return isValid;
}
