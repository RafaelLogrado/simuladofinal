const Inspecao = require('../models/Inspecao')
const Equipamento = require('../models/Equipamento')

const cadastrar = async (req,res) => {
    const valores = req.body

    if(!valores.idEquipamento || !valores.status || !valores.data){
        return res.status(401).json({message: "Todos os campos são obrigatórios!"})
    }

    try{
        const equipamento = await Equipamento.findByPk(valores.idEquipamento)
        if(!equipamento){
            return res.status(404).json({message: "Equipamento não encontrado!"})
        }

        await Inspecao.create(valores)
        res.status(201).json({message: "Inspeção cadastrada com sucesso!"})
    }catch(err){
        console.error("Erro ao cadastrar", err)
        res.status(500).json({message: "Erro ao cadastrar"})
    }
}

const listar = async (req,res) => {
    try{
        const inspecoes = await Inspecao.findAll()

        res.status(200).json(inspecoes)
    }catch(err){
        console.error("Erro ao listar")
        res.status(500).json({message: "Erro ao listar"})
    }
}

module.exports = { cadastrar, listar }