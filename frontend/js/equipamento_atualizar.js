let btn_atualizar = document.getElementById('btn_atualizar')
let resposta = document.getElementById('resposta')

const token = localStorage.getItem('token')
if(!token){
    location.href = "../index.html"
}

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const codEquipamento = document.getElementById('codEquipamento').value

    const idCliente = document.getElementById('idCliente').value
    const modelo = document.getElementById('modelo').value
    const fabricante = document.getElementById('fabricante').value
    const numSerie = document.getElementById('numSerie').value

    const valores = {
        idCliente: idCliente,
        modelo: modelo,
        fabricante: fabricante,
        numSerie: numSerie
    }

    fetch(`http://localhost:3000/equipamento/${codEquipamento}`, {
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