export const catchAsyncError=(passedFunction)=>()=>{
    Promise.resolve(passedFunction(req,res,next)).catch(next)

}