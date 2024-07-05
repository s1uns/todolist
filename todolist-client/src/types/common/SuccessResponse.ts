export type SuccessResponse<TData> = {
  code: number;
  message: string;
  data?: TData;
  success: boolean;
};
