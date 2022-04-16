import { User, userInitState } from "@/redux/reducers/userReducer";
import { SignInPayload } from "@/types/dto/apiPayloads/auth";
import { SignInDto } from "@/types/dto/user"
import { getTokenInfoRoute, signInRoute } from "../constants"


export const getTokenInfo = async (token: string): Promise<User> => {
    const payload = await fetch(getTokenInfoRoute, {
        method: "GET", 
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        }), 
    })
    return await payload.json();
}

export const signIn = async (dto: SignInDto): Promise<SignInPayload> => {
    const result = await fetch(signInRoute, {
        method: "POST",
        body: JSON.stringify(dto)
    })
    return await result.json();
}



export default {signIn, getTokenInfo}