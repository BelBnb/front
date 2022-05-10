import { requestWithBody } from "@/api/apiService";
import { createNeighbourRoute, methods } from "../constants";
import { createNeighbourDto } from "@/types/dto/neighbours/createNeighbourDto";

const createNeighboursRequest = async (neighbourDate: createNeighbourDto) => {
  const result = await requestWithBody(createNeighbourRoute, methods.POST, neighbourDate);
  return result.json();
};

//todo: fix
const getNeighboursRequest = async (neighbourDate: createNeighbourDto) => {
  const result = await requestWithBody(createNeighbourRoute, methods.GET, neighbourDate);
  return result.json();
};

export default { createNeighboursRequest, getNeighboursRequest };
