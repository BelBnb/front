import { requestWithBody } from "@/api/apiService";
import { createNeighbourRoute, methods } from "../constants";
import { createNeighbourDto } from "@/types/dto/neighbours/createNeighbourDto";

const createNeighboursRequest = async (neighbourDate: createNeighbourDto) => {
  const result = await requestWithBody(createNeighbourRoute, methods.POST, neighbourDate);

  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

//todo: fix
const getNeighboursRequest = async (neighbourDate: createNeighbourDto) => {
  const result = await requestWithBody(createNeighbourRoute, methods.GET, neighbourDate);
  return new Promise((res, rej) => {
    result.json().then((data) => {
      if (data.error) rej(data);
      res(data);
    });
  });
};

export default { createNeighboursRequest, getNeighboursRequest };
