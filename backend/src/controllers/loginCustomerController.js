import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import customerModel from "../models/customers.js";
import { config } from "../../config.js";

const loginCustomerController = {}

loginCustomerController.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        //Verificar que existe el correo en la bd
        const userFound = await customerModel.findOne({email})
        if(!userFound){
            return res.status(400).json({message: "Cliente no encontrado"})
        }

        //Verificar que no esté bloqueado

        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message:"Cuenta bloqueada"})
        }

        //Validar la constraseña
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
        //Si se equivoca en la contraseña, 
        //vamosa sumarle 1 a los intentos fallidos

        userFound.loginAttempts = (userFound.loginAttempts || 0) + 1

        //Bloquear la cuenta después de 5 intentos fallidos
        if(userFound.loginAttempts >= 5){
            userFound.timeOut = Date.now() + 15*60*1000
            userFound.loginAttempts = 0

            await userFound.save();
            return res.status(403).json({message: "Cuenta bloqueada por 15 minutos"})
        }

        await userFound.save();
        return res.status(400).json({message: "Contraseña incorrecta"})
    }

    //Si escribe la contraseña bien, hay que borrar los
    //intentos fallidos anteriores
    userFound.loginAttempts = 0
    userFound.timeOut = null
    await userFound.save();

    //Generar el token 
    const token = jsonwebtoken.sign(
        //#1 - ¿Que vamos a guardar?
        {id: userFound._id, userType: "customer"},
        //#2 - Secret key
        config.JWT.secret,
        //#3 - cuando experi
        {expiresIn: "30d"}

    )
        //Guardamos el token en una cookie
        res.cookie("authToken", token)

        //Listo
        return res.status(200).json({message: "login exitoso"})

    }catch(error){
        console.log("error: " + error)
        return res.status(500).json({message: "Error en el servidor"})
    }

}

export default loginCustomerController;