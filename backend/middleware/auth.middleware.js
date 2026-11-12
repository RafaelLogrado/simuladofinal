const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = "segredo"

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(403).json({message: "Acesso proibido. Faça o login!"})
    }

    const dadosDescriptografados = cryptoJS.AES.decrypt(token, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)

    if(!dadosDescriptografados){
        return res.status(403).json({message: "Acesso proibido"})
    }

    if(dadosDescriptografados.expiraEm < Date.now()){
        return res.status(403).json({message: "Tempo expirado. Refaça o login!"})
    }

    req.usuario = token 
    
    next()
}

module.exports = authMiddleware