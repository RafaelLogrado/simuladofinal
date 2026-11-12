const Usuario = require('../models/Usuario')

const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = "segredo"

const login = async (req,res) => {
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(401).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        const usuario = await Usuario.findOne({where: {email: valores.email}})
        if(!usuario){
            return res.status(401).json({message: "Email e/ou senha incorretos!"})
        }

        const senhaBD = cryptoJS.AES.decrypt(usuario.senha, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)

        if(valores.senha !== senhaBD){
            return res.status(401).json({message: "Email e/ou senha incorretos!"})
        }

        const expiraEm = 1000 * 60 * 200    // 200 mintuos

        const payload = {
            expiraEm: expiraEm,
            codUsuario: usuario.codUsuario,
            nome: usuario.nome
        }

        const token = cryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        res.status(200).json({
            message: "Login realizado com sucesso!",
            token: token,
            nome: usuario.nome
        })
    }catch(err){
        console.error("Erro ao realizar login", err)
        res.status(500).json({message: "Erro ao realizar login"})
    }
}

module.exports = { login }