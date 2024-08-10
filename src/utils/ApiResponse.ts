const ApiResponse = (
  success: boolean,
  msg: string,
  stat: number,
  data?: any
) => {
  return Response.json(
    {
      success,
      message: msg,
      data,
    },
    {
      status: stat,
    }
  );
};

export default ApiResponse;
