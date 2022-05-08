import { SexEnum } from "@/common/sex.enum";
import { getHotelPayload } from "../dto/apiPayloads/getAllHotelsPayload";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  roles: string[];
  profilePic: string;
  authorized: boolean;
  birthDate: Date;
  password: string;
  sex: SexEnum;
};

export const userInitState: User = {
  email: "",
  firstName: "",
  lastName: "",
  id: "",
  roles: [],
  authorized: false,
  password: "",
  sex: SexEnum.Male,
  birthDate: new Date("2001-01-01"),
  profilePic:
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E",
};

export type Hotel = getHotelPayload;

export const hotelsInitState: Hotel[] = [];
