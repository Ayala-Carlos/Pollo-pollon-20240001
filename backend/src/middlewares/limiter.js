import rateLimit from "express-rate-limit"

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000, //15 Minutos
    max: 30, // máximo de solicitudes HTTP
    message:{
        status: 429,
        error: "Too many request"
    }
})

export default limiter