const logoutCOntroller = {};

logoutCOntroller.logout = (req, res) => {
    try{
        res.clearCookie("authToken")

        return res.status(200).json({message: "Sesión cerrada"})
    }catch(error){

    }
}
export default logoutCOntroller;