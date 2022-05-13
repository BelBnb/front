import { requestWithBody, requestWithFormData, requestWithQuerry } from "@/api/apiService";
import { getAllUsers, getUsersByIds_, methods, updateUserRoute } from "../constants";

const updateAvatar = async (formData: FormData, id: string) => {
  const result = await requestWithFormData(updateUserRoute(id), methods.PATCH, formData);
  return result.data;
};
const updateUser = async (obj: { firstName: string; lastName: string }, id: string) => {
  const result = await requestWithBody(updateUserRoute(id), methods.PUT, obj);
  return result;
};

const getUsers = async (obj: { limit: number; offset: number }) => {
  const result = await requestWithQuerry(getAllUsers, methods.GET, obj);
  return result;
};

const getUsersByIds = async (obj: { ids: string }) => {
  const result = await requestWithQuerry(getUsersByIds_, methods.GET, obj);
  return result;
};

export default { updateAvatar, updateUser, getUsers, getUsersByIds };
