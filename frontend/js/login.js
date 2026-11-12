let btn_logar = document.getElementById('btn_logar')
let resposta = document.getElementById('resposta')

btn_logar.addEventListener('click', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }

    fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then((dados) => {
        if(dados.token){
            localStorage.setItem('token', dados.token)
            localStorage.setItem('nome', dados.nome)
            location.href = "../index.html"
        }
        resposta.innerHTML = dados.message
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error("Erro ao realizar login", err)
    })
})