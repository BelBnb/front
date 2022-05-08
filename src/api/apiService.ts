import axios from "axios";

export const getToken = () => localStorage.getItem("token");

export function requestWithBody<T>(url: string, method: string, body: T) {
  return fetch(url, {
    method,
    headers: new Headers({
      Authorization: `Bearer ${getToken()}`,
      "Content-type": "application/json",
    }),
    body: JSON.stringify(body),
  });
}

export function request(ur: string, method: string): Promise<Response> {
  console.log(ur);
  return fetch(ur, {
    method,
    headers: new Headers({
      Authorization: `Bearer ${getToken()}`,
    }),
  });
}

export function requestWithQuerry(
  ur: string,
  method: string,
  querry: { [key: string]: string | number }
): Promise<Response> {
  let querryString = "?";
  for (const querryKey in querry) {
    querryString += `${querryKey}=${querry[querryKey]}&`;
  }
  return fetch(ur + querryString, {
    method,
    headers: new Headers({
      Authorization: `Bearer ${getToken()}`,
    }),
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
