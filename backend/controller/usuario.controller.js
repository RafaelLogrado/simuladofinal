const Usuario = require('../models/Usuario')

const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = "segredo"

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(401).json({message: "Todos os campos são obrigatórios!"})
    }

    try{

        valores.senha = cryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        await Usuario.create(valores)

        res.status(201).json({message: "Usuário cadastrado com sucesso!"})
    }catch(err){
        console.error("Erro ao cadastrar", err)
        res.status(500).json({message: "Erro ao cadastrar"})
    }
}

module.exports = { cadastrar }