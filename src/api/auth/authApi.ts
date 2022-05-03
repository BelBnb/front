import { User } from "@/redux/reducers/userReducer";
import { SignInPayload, SignUpPayload } from "@/types/dto/apiPayloads/auth";
import { SignInDto, SignUpDto } from "@/types/dto/user";
import { getTokenInfoRoute, signInRoute, signUpRoute } from "../constants";

export const getTokenInfo = async (token: string): Promise<User> => {
  const payload = await fetch(getTokenInfoRoute, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });
  return payload.json();
};

export const signIn = async (dto: SignInDto): Promise<SignInPayload> => {
  const result = await fetch(signInRoute, {
    method: "POST",
    body: JSON.stringify(dto),
  });
  return result.json();
};

export const signUp = async (dto: SignUpDto): Promise<SignUpPayload> => {
  const result = await fetch(signUpRoute, {
    method: "POST",
    body: JSON.stringify(dto),
  });
  return result.json();
};

export default { signIn, getTokenInfo, signUp };
