import { requestWithBody, requestWithQuerry } from "@/api/apiService";
import { getAllMessages, methods, postMessage } from "../constants";

const createMessage = async (obj: { from: string; to: string; text: string }) => {
  const result = await requestWithBody(postMessage, methods.POST, obj);
  return result;
};

const getMessages = async (obj: { limit: number; offset: number; from: string; to: string }) => {
  const result = await requestWithQuerry(getAllMessages, methods.GET, obj);
  return result;
};

export default { createMessage, getMessages };
