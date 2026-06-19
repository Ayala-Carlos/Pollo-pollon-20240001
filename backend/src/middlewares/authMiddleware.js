import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"

export const validateAuthCookie = (allowedTypes = []) => {

    return (req, res, next) => {
        try{
            //#1 - Extraer el token que está en la cookie (authCookie)
            //ya que en esa cookie está el tipo de usuario que
            //inició sesión

            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(403).json({message: "No cookie found, Authorization denied"})
            }

            //Extraer toda la información de la cookie
            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret)

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "Unauthorized, insufficient permissions"})
            }

            next();

        }catch(error){
            console.error("Error validating auth cookie:", error)
            return res.status(500).json({message: "Internal server error"})
        }
    }
}