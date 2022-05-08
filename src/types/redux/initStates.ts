export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  roles: string[];
  profilePic: string;
  authorized: boolean;
};

export const userInitState: User = {
  email: "",
  firstName: "",
  lastName: "",
  id: 0,
  roles: [],
  authorized: false,
  profilePic: "",
};
