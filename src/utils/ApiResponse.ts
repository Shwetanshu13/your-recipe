const ApiResponse = (success:boolean, msg:string, stat:number) =>{
    return Response.json(
        {
            success: success,
            message: msg
        },
        {
            status: stat
        }
    )}

export default ApiResponse;
