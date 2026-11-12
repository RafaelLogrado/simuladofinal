let btn_consultar = document.getElementById('btn_consultar')
let resposta = document.getElementById('resposta')

const token = localStorage.getItem('token')
if(!token){
    location.href = "../index.html"
}

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    let codCliente = document.getElementById('codCliente')

    fetch(`http://localhost:3000/cliente/${codCliente}`, {
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
        console.error("Erro ao consultar cliente", err)
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
        cabecalho += `
        <tr>
            <td>${dados.codCliente}</td>
            <td>${dados.nome}</td>
            <td>${dados.cpf}</td>
        </tr>`
    cabecalho += `</tbody>`
    return cabecalho
}