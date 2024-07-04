export type ServerError = {
  status: number;
  response: {
    code: number;
    message: string;
    success: boolean;
  };
};
