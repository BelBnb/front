export type SignUpDto = {
  email: string;
  password: string;
  phone?: string;
  sex: number;
  firstName: string;
  lastName: string;
  username: string;
  birthDate: Date;
};
export type SignInDto = {
  email: string;
  password: string;
};
