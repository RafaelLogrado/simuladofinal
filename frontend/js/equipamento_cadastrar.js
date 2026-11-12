let btn_cadastrar = document.getElementById('btn_cadastrar')
let resposta = document.getElementById('resposta')

const token = localStorage.getItem('token')
if(!token){
    location.href = "../index.html"
}

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

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

    fetch(`http://localhost:3000/equipamento`, {
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