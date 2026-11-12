const Equipamento = require('../models/Equipamento')
const Cliente = require('../models/Cliente')

const cryptoJS = require('crypto-js')
const CHAVE_SECRETA = "segredo"

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.idCliente || !valores.modelo || !valores.fabricante || !valores.numSerie){
        return res.status(401).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        valores.numSerie = cryptoJS.AES.encrypt(valores.numSerie, CHAVE_SECRETA).toString()
        await Equipamento.create(valores)

        res.status(201).json({message: "Equipamento cadastrado com sucesso!"})
    }catch(err){
        console.error("Erro ao cadastrar", err)
        res.status(500).json({message: "Erro ao cadastrar"})
    }
}

const atualizar = async (req,res) => {
    const valores = req.body
    const valor = req.params.id

    if(!valores.idCliente || !valores.modelo || !valores.fabricante || !valores.numSerie){
        return res.status(401).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        const equipamento = await Equipamento.findByPk(valor)
        if(!equipamento){
            return res.status(404).json({message: "Equipamento não encontrado!"})
        }
        
        const cliente = await Cliente.findByPk(valores.idCliente)
        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado!"})
        }

        valores.numSerie = cryptoJS.AES.encrypt(valores.numSerie, CHAVE_SECRETA).toString()
        await equipamento.update(valores)

        res.status(200).json({message: "Equipamento atualizado com sucesso!"})
    }catch(err){
        console.error("Erro ao atualizar", err)
        res.status(500).json({message: "Erro ao atualizar"})
    }
}

module.exports = { cadastrar, atualizar }