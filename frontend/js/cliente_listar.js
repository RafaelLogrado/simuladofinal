let btn_listar = document.getElementById('btn_listar')
let resposta = document.getElementById('resposta')

const token = localStorage.getItem('token')
if(!token){
    location.href = "../index.html"
}

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/clientes`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization':token
        }
    })
    .then(res => res.json())
    .then((dados) => {
        resposta.innerHTML = `<table>${thead()}${tbody(dados)}</table>`
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error("Erro ao listar clientes", err)
    })
})

function thead(){
    let cabecalho = `
    <thead>
        <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CPF</th>
        </tr>
    </thead>`
    return cabecalho
}


function tbody(dados){
    let cabecalho = `<tbody>`
    dados.forEach(element => {
        cabecalho += `
        <tr>
            <td>${element.codCliente}</td>
            <td>${element.nome}</td>
            <td>${element.cpf}</td>
        </tr>`
    })
    cabecalho += `</tbody>`
    return cabecalho
}