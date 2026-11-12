const token = localStorage.getItem('token')
const nome = localStorage.getItem('nome')

if(token){
    document.getElementById('login_usuario').innerHTML = `
    Nome: ${nome} &emsp;
    <a href="#" id="btn_logout">Logout</a>
    `

    let btn_logout = document.getElementById('btn_logout')
    btn_logout.addEventListener('click', (e) => {
        e.preventDefault()

        localStorage.clear()
        location.reload()
    })


    document.getElementById('login_cliente').innerHTML = `
    <span class="titulo_menu">Cliente</span> &emsp;
    <a href="./html/cliente_cadastrar.html">Cadastrar</a> &emsp;
    <a href="./html/cliente_listar.html">Listar</a> &emsp;
    <a href="./html/cliente_consultar.html">Consultar</a> &emsp;
    <a href="./html/cliente_apagar.html">Apagar</a> &emsp;
    <a href="./html/cliente_atualizar.html">Atualizar</a>
    <br><br><hr><br>
    `

    document.getElementById('login_equipamento').innerHTML = `
    <span class="titulo_menu">Equipamento</span> &emsp;
    <a href="./html/equipamento_cadastrar.html">Cadastrar</a> &emsp;
    <a href="./html/equipamento_atualizar.html">Atualizar</a>
    <br><br><hr><br>
    `

    document.getElementById('login_inspecao').innerHTML = `
    <span class="titulo_menu">Inspeção</span> &emsp;
    <a href="./html/inspecao_cadastrar.html">Cadastrar</a> &emsp;
    <a href="./html/inspecao_listar.html">Listar</a>
    <br><br><hr><br>
    `
}