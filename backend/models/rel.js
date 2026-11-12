const Usuario = require('./Usuario')
const Cliente = require('./Cliente')
const Equipamento = require('./Equipamento')
const Inspecao = require('./Inspecao')


Cliente.hasMany(Equipamento, {
    as: "equipamentoCliente",
    foreignKey: 'idCliente',
    onDelete: 'CASCADE'
})

Equipamento.belongsTo(Cliente, {
    as: "clienteEquipamento",
    foreignKey: 'idCliente'
})


Equipamento.hasMany(Inspecao, {
    as: "inspecaoEquipamento",
    foreignKey: 'idEquipamento',
    onDelete: 'CASCADE'
})

Inspecao.belongsTo(Equipamento, {
    as: "equipamentoInspecao",
    foreignKey: 'idEquipamento'
})

module.exports = { Usuario, Cliente, Equipamento, Inspecao }