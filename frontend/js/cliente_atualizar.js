let btn_atualizar = document.getElementById('btn_atualizar')
let resposta = document.getElementById('resposta')

const token = localStorage.getItem('token')
if(!token){
    location.href = "../index.html"
}

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const codCliente = document.getElementById('codCliente').value
    
    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value

    const valores = {
        nome: nome,
        cpf: cpf
    }

    fetch(`http://localhost:3000/cliente/${codCliente}`, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'Authorization':token
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then((dados) => {
        resposta.innerHTML = dados.message
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error("Erro ao realizar atualização", err)
    })
})