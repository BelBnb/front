import { requestWithBody, requestWithFormData, requestWithQuerry } from "@/api/apiService";
import { getAllUsers, getUsersByIds_, methods, updateUserRoute } from "../constants";

const updateAvatar = async (formData: FormData, id: string) => {
  const result = await requestWithFormData(updateUserRoute(id), methods.PATCH, formData);
  return result.data;
};
const updateUser = async (obj: { firstName: string; lastName: string }, id: string) => {
  const result = await requestWithBody(updateUserRoute(id), methods.PUT, obj);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const getUsers = async (obj: { limit: number; offset: number }) => {
  const result = await requestWithQuerry(getAllUsers, methods.GET, obj);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const getUsersByIds = async (obj: { ids: string }) => {
  const result = await requestWithQuerry(getUsersByIds_, methods.GET, obj);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

export default { updateAvatar, updateUser, getUsers, getUsersByIds };
