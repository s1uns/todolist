import { Dispatch } from "react";

export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
  setErrors?: Dispatch<React.SetStateAction<string | null>>;
};
