import { requestWithBody, requestWithFormData, requestWithQuerry } from "@/api/apiService";
import {
  getAllUsers,
  getAllUsersFiltered,
  getUserByUserName,
  getUsersByIds_,
  methods,
  updateUserRoute,
} from "../constants";

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
const getUsersFiltered = async (obj: { limit: number; offset: number; text?: string }) => {
  const result = await requestWithQuerry(getAllUsersFiltered, methods.GET, {
    text: obj.text || "",
    limit: obj.limit,
    offset: obj.offset,
  });
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

const getUserByUsername = async (obj: { username: string }) => {
  const result = await requestWithQuerry(getUserByUserName(obj.username), methods.GET, {});
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

export default { updateAvatar, updateUser, getUsers, getUsersByIds, getUserByUsername, getUsersFiltered };
