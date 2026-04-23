import jsonwebtoken from "jsonwebtoken"; //crear token
import bcrypt from "bcryptjs"; //encriptar contraseña
import crypto from "crypto"; //Generar codigo aleatorio
import nodemailer from "nodemailer"; //Enviar correo electronico
import HTMLRecoveryEmail from "../utils/sendMailRecovery.js";

import {config} from "../../config.js";

import customerModel from "../models/customers.js"

const recoveryPasswordController = {};

//Primera pantalla para recuperar contraseña
recoveryPasswordController.requestCode = async (req, res) => {
    try{

        //Solicitamos los datos
        const {email} = req.body;

        //Validar que correo si este en la bd
        const userFound = await customerModel.findOne({email});

        if(!userFound){
            return res.json({message: "User not found"})
        }

        //generar codigo aleatorio
        const code = crypto.randomBytes(3).toString("hex")

        //Guardar todo en un token
         const token = jsonwebtoken.sign(
            //#-1 que datos quiero guardar
            {email, code, userType: "customer", verified: false},
            //#-2 palabra secreta
            config.JWT.secret,
            //#-3 tiempo de expiracion
            {expiresIn: "15m"},
         );

         res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

         //Enviar correo electronico
         //#-1 quien lo envia
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: config.email.user_email,
                    pass: config.email.user_password
                }
            });

            //#-2 a quien se lo envia y como lo recibe
            const mailOptions = {
                from: config.email.user_email,
                to: email,
                subject: "Correo de recuperación de contraseña",
                body: "Este correo es para recuperar tu contraseña",
                html: HTMLRecoveryEmail(code)
            };

            //#-3 enviar el correo
            transporter.sendMail(mailOptions, (error, info) => {
                if(error){
                    console.log("error "+ error);
                    return res.status(500).json({message: "Error sending email"})
                }
                return res.status(200).json({message: "Verification code sent to email"})
            });



    }catch(error){
        console.log("Error en el servidor "+ error);
        return res.status(500).json({message: "Server error"})
    }
};

//Segunda pantalla para recuperar contraseña
recoveryPasswordController.verifyCode = async (req, res) => {
    try{
        //Solicitamos los datos
        const {codeRequest} = req.body;

        //Obtenemos la informacion del token
        //Accedo al token que esta en recoveryCookie
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        //Comparar el codigo que envio el usuario con el codigo que esta en el token
        if(codeRequest !== decoded.code){
            return res.status(400).json({message: "Invalid code"})
        }

        //Si el codigo es correcto, actualizamos el token para indicar que el codigo ya fue verificado
        const newToken = jsonwebtoken.sign(
            //-1 que datos quiero guardar
            {email: decoded.email, code: decoded.code, userType: decoded.userType, verified: true},
            //-2 palabra secreta
            config.JWT.secret,
            {expiresIn: "15m"}
        );
        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});
        return res.status(200).json({message: "Code verified"})
    }
    catch(error){
        console.log("Error en el servidor "+ error);
        return res.status(500).json({message: "Server error"})
    }
};

//Tercera pantalla para recuperar contraseña
recoveryPasswordController.newPassword = async (req, res) => {
    try{

        //Solicitamos los datos
        const {newPassword, confirmePassword} = req.body;

        //Comparar las contraseñas
        if(newPassword !== confirmePassword){
            return res.status(400).json({message: "Passwords do not match"})
        }

        //Vamos a comprobar el token si ya esta verficado
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if(!decoded.verified){
            return res.status(400).json({message: "Code not verified"})
        }

        //Encriptar la nueva contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10);

        //Actualizar la contraseña en la base de datos
        await customerModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash}
        );

        //Eliminar la cookie
        res.clearCookie("recoveryCookie");
        return res.status(200).json({message: "Password updated successfully"})

    }catch(error){
        console.log("Error en el servidor "+ error);
        return res.status(500).json({message: "Server error"})

    }
};

export default recoveryPasswordController;
