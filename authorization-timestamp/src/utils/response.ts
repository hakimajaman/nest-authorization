export const SuccessResponse = (
  statusCode: number,
  message: string,
  data: any,
) => {
  return {
    statusCode,
    message,
    data,
  };
};

export const ErrorResponse = (statusCode: number, message: string) => {
  return {
    statusCode,
    message,
    data: null,
  };
};
