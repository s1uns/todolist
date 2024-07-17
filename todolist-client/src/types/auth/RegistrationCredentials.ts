export type RegistrationCredentials = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: number | null;
  city: string;
  country: string;
  heardFrom: number[];
  rememberMe: boolean;
  password: string;
  passwordConfirmation: string;
};
