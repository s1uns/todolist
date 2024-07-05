export type ErrorResponse<T> = {
  code: number | undefined;
  message: string | undefined;
  success: boolean | undefined;
  data?: T;
};
