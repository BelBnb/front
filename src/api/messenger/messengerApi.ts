import { request, requestWithBody, requestWithQuerry } from "@/api/apiService";
import { getAllMessages, getDialogs_, getMessage_, methods, postMessage } from "../constants";

const createMessage = async (obj: { from: string; to: string; text: string }) => {
  const result = await requestWithBody(postMessage, methods.POST, obj);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const getMessages = async (obj: { limit: number; offset: number; from: string; to: string }) => {
  const result = await requestWithQuerry(getAllMessages, methods.GET, obj);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const getMessage = async (id: string) => {
  const result = await request(getMessage_(id), methods.GET);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

const getDialogs = async (id: string, dto: { limit: number; offset: number }) => {
  const result = await requestWithQuerry(getDialogs_(id), methods.GET, dto);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

export default { createMessage, getMessages, getMessage, getDialogs };
