import { verifyToken } from './auth';

export function getUserFromRequest(req: Request) {
  const auth = req.headers.get('authorization');
  if (!auth) return null;

  const token = auth.split(' ')[1]; // Bearer <token>
  const user = verifyToken(token);
  return user;
}
