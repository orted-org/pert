import { CreateHandler } from "../app/factory";

export const HandleMiddleGoodMiddleware = CreateHandler({
    handle: async (req, res, next, app) => {
        console.log("i am middleware");
        next()
    }
})
