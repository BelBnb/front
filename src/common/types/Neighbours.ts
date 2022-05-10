import { SexEnum } from "@/common/sex.enum";

export type Neighbours = {
  userId: string;

  userImage: string;
  userFirstName: string;
  userLastName: string;

  city: string;
  description: string;
  startDate: Date;
  endDate: Date;

  sex: SexEnum;
  birthDate: Date;
};
