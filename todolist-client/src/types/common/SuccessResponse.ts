export type SuccessResponse<TData> = {
  code: 200;
  message: string;
  data?: TData;
  success: boolean;
};
