import axios from "axios";

export const getToken = () => localStorage.getItem("token");

export function requestWithBody<T>(url: string, method: string, body: T) {
  return fetch(url, {
    method,
    headers: {
      Autorization: `Bearer ${getToken()}`,
      body: JSON.stringify(body),
    },
  });
}

export function request(url: string, method: string) {
  return fetch(url, {
    method,
    headers: {
      Autorization: `Bearer ${getToken()}`,
    },
  });
}

export function requestWithFormData(url: string, method: string, body: FormData) {
  return axios.post(url, body, {
    method,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-type": "multipart/form-data",
    },
  });
}
