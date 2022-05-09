import { requestWithBody, requestWithFormData } from "@/api/apiService";
import { methods, updateUserRoute } from "../constants";

const updateAvatar = async (formData: FormData, id: string) => {
  const result = await requestWithFormData(updateUserRoute(id), methods.PATCH, formData);
  return result.data;
};
const updateUser = async (obj: { firstName: string; lastName: string }, id: string) => {
  const result = await requestWithBody(updateUserRoute(id), methods.PUT, obj);
  return result;
};

export default { updateAvatar, updateUser };
