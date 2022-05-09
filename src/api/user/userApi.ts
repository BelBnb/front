import { requestWithFormData } from "@/api/apiService";

export const updateAvatar = async (formData: FormData) => {
  const result = await requestWithFormData("/gate", methods.PATCH, formData);
  return result.data;
};
