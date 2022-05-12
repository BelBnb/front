import { request, requestWithBody, requestWithQuerry } from "@/api/apiService";
import { getAllMessages, getMessage_, methods, postMessage } from "../constants";

const createMessage = async (obj: { from: string; to: string; text: string }) => {
  const result = await requestWithBody(postMessage, methods.POST, obj);
  return result;
};

const getMessages = async (obj: { limit: number; offset: number; from: string; to: string }) => {
  const result = await requestWithQuerry(getAllMessages, methods.GET, obj);
  return result;
};

const getMessage = async (id: string) => {
  const result = await request(getMessage_(id), methods.GET);
  return result;
};

export default { createMessage, getMessages, getMessage };
