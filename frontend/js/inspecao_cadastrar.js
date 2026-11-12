let btn_cadastrar = document.getElementById('btn_cadastrar')
let resposta = document.getElementById('resposta')

const token = localStorage.getItem('token')
if(!token){
    location.href = "../index.html"
}

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const idEquipamento = document.getElementById('idEquipamento').value
    const status = document.getElementById('status').value
    const data = document.getElementById('data').value

    const valores = {
        idEquipamento: idEquipamento,
        status: status,
        data: data
    }

    fetch(`http://localhost:3000/inspecao`, {
        method: 'POST',
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
        console.error("Erro ao realizar cadastro", err)
    })
})