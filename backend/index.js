const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const hostname = 'localhost'
const PORT = 3000

const authController = require('./controller/auth.controller')
const usuarioController = require('./controller/usuario.controller')
const clienteController = require('./controller/cliente.controller')
const equipamentoController = require('./controller/equipamento.controller')
const inspecaoController = require('./controller/inspecao.controller')
const authMiddleware = require('./middleware/auth.middleware')

// ---------- Middleware ----------

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ---------- Rotas ----------

// Rotas públicas
app.post('/usuario', usuarioController.cadastrar)
app.post('/login', authController.login)


// Rotas privadas
app.use(authMiddleware)

app.post('/cliente', clienteController.cadastrar)
app.get('/clientes', clienteController.listar)
app.get('/cliente/:id', clienteController.consultar)
app.get('/cliente/buscar/:nome', clienteController.consultarNome)
app.put('/cliente/:id', clienteController.atualizar)
app.delete('/cliente/:id', clienteController.apagar)

app.post('/equipamento', equipamentoController.cadastrar)
app.put('/equipamento/:id', equipamentoController.atualizar)

app.post('/inspecao', inspecaoController.cadastrar)
app.get('/inspecoes', inspecaoController.listar)

// ---------- Server ----------
conn.sync()
.then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err) => {
    console.error("Erro ao sincronizar", err)
})