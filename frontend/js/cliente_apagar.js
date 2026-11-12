let btn_apagar = document.getElementById('btn_apagar')
let resposta = document.getElementById('resposta')

const token = localStorage.getItem('token')
if(!token){
    location.href = "../index.html"
}

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const codCliente = document.getElementById('codCliente').value

    fetch(`http://localhost:3000/cliente/${codCliente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization':token
        }
    })
    .then(res => res.json())
    .then((dados) => {
        resposta.innerHTML = dados.message
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error("Erro ao apagar cliente", err)
    })
})