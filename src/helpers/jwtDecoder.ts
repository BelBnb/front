import jwt from "jwt-decode";

interface extendedPaload {
  id?: string;
  email?: string;
}

export default function decode(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const decoded: extendedPaload = jwt(token);
  return decoded;
}
