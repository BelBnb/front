import { SexEnum } from "@/common/sex.enum";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  roles: string[];
  profilePic: string;
  authorized: boolean;
  birthDate: Date;
  sex: SexEnum;
};

export const userInitState: User = {
  email: "",
  firstName: "",
  lastName: "",
  id: "",
  roles: [],
  authorized: false,
  sex: SexEnum.Male,
  birthDate: new Date("2001-01-01"),
  profilePic:
    "https://res.cloudinary.com/dv1m78v3d/image/upload/c_thumb,w_200,g_face/v1650789446/ukrgenubujqt86buzrsk.jpg",
};
