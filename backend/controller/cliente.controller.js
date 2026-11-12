const Cliente = require('../models/Cliente')

const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = "segredo"

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.nome || !valores.cpf){
        return res.status(401).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length !== 11){
        return res.status(401).json({message: "CPF inválido!"})
    }

    try{
        valores.cpf = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        await Cliente.create(valores)

        res.status(201).json({message: "Cliente cadastrado com sucesso!"})
    }catch(err){
        console.error("Erro ao cadastrar", err)
        res.status(500).json({message: "Erro ao cadastrar"})
    }
}

const listar = async (req,res) => {
    try{
        const clientes = await Cliente.findAll()

        clientes.forEach(element => {
            element.cpf = cryptoJS.AES.decrypt(element.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)
        })

        res.status(200).json(clientes)
    }catch(err){
        console.error("Erro ao listar", err)
        res.status(500).json({message: "Erro ao listar"})
    }
}

const consultar = async (req,res) => {
    const valor = req.params.id

    try{
        const cliente = await Cliente.findByPk(valor)

        cliente.cpf = cryptoJS.AES.decrypt(cliente.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)

        res.status(200).json(cliente)
    }catch(err){
        console.error("Erro ao consultar", err)
        res.status(500).json({message: "Erro ao consultar"})
    }
}

const consultarNome = async (req,res) => {
    const valor = req.params.nome

    try{
        const cliente = await Cliente.findOne({where: {nome: valor}})

        cliente.cpf = cryptoJS.AES.decrypt(cliente.cpf, CHAVE_SECRETA).toString(cryptoJS.enc.Utf8)

        res.status(200).json(cliente)
    }catch(err){
        console.error("Erro ao consultar", err)
        res.status(500).json({message: "Erro ao consultar"})
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const valor = req.params.id

    if(!valores.nome || !valores.cpf){
        return res.status(401).json({message: "Todos os campos são obrigatórios!"})
    }

    if(valores.cpf.length !== 11){
        return res.status(401).json({message: "CPF inválido!"})
    }

    try{
        const cliente = await Cliente.findByPk(valor)
        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        valores.cpf = cryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        await cliente.update(valores)

        res.status(200).json({message: "Cliente atualizado com sucesso!"})
    }catch(err){
        console.error("Erro ao atualizar", err)
        res.status(500).json({message: "Erro ao atualizar"})
    }
}

const apagar = async (req,res) => {
    const valor = req.params.id

    try{
        const cliente = await Cliente.findByPk(valor)
        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        await cliente.destroy()
        res.status(200).json({message: "Cliente apagado com sucesso!"})
    }catch(err){
        console.error("Erro ao apagar", err)
        res.status(500).json({message: "Erro ao apagar"})
    }
}

module.exports = { cadastrar, listar, consultar, consultarNome, apagar, atualizar }