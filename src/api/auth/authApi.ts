import { SignInPayload, SignUpPayload } from "@/types/dto/apiPayloads/auth";
import { SignInDto, SignUpDto } from "@/types/dto/user";
import { User } from "@/types/redux/initStates";
import { request, requestWithBody } from "../apiService";
import { getTokenInfoRoute, methods, signInRoute, signUpRoute } from "../constants";

export const getTokenInfo = async (id: string): Promise<User> => {
  const payload = await request(getTokenInfoRoute + id, methods.GET);
  return payload.json();
};

export const signIn = async (dto: SignInDto): Promise<SignInPayload> => {
  const result = await requestWithBody(signInRoute, methods.POST, dto);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const signUp = async (dto: SignUpDto): Promise<SignUpPayload> => {
  const result = await requestWithBody(signUpRoute, methods.POST, dto);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

export default { signIn, getTokenInfo, signUp };
