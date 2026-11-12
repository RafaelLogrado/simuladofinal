const { Usuario, Cliente, Equipamento, Inspecao } = require('./models/rel')
const conn = require('./db/conn')

async function syncDatabase(){
    try{
        await conn.sync({force: true})
        console.log("Tabelas sincronizadas")
    }catch(err){
        console.error("Erro ao sincronizar tabelas", err)
    }finally{
        await conn.close()
        console.log("Sincronização fechada")
    }
}

syncDatabase()