let nome;
safeName();

function safeName() {
    nome = prompt("Dgite seu nome");
    let nomeDado = {
        name: nome
    };

    const sendName = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants" , nomeDado);

    sendName.then(sucess);
    sendName.catch(failed);

    function sucess() {
        alert("Nome aceito");
    }

    function failed() {
        const nome = prompt("Digite outro nome pois este já está em uso");
        let nomeDado = {
            name: nome
        };
        const sendName = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nomeDado);
        sendName.then(sucess);
        sendName.catch(failed);
    }
}

call()
setInterval(call, 3000);

function call() {
    const promessa = axios.get();
    promessa.then(chargeMessages);
}

function chargeMessages(dados) {
    resposta = dados.data;
    renderMessagens();
}

function renderMessagens() {
    const messages = document.querySelector(".messages");
    messages.innerHTML = "";

    for (let i = 0; i < resposta.length; i++) {

        if (resposta[i].type == "status") {
            messages.innerHTML += `<div class="message status"> <p> <span class="time">&nbsp;(${resposta[i].time})&nbsp;</span></p><span class="name">${resposta[i].from}&nbsp;</span> ${resposta[i].text} </div>`;
        } else if (resposta[i].type == "message") {
            messages.innerHTML += `<div class="message"> <p> <span class="time">&nbsp;(${resposta[i].time})&nbsp;</span></p><span class="name">${resposta[i].from}&nbsp;</span>para<span class="name">&nbsp;${resposta[i].to}</span><span>:&nbsp;${resposta[i].text} </div>`;
        } else if (resposta[i].type == "private_message" && nome === resposta[i].to) {
            messages.innerHTML += `<div class="message reservada"><p> <span class="time">&nbsp;(${resposta[i].time})<span class="name">nbsp;${resposta[i].from}&nbsp;</span>reservadamente para<span class="name">&nbsp;${resposta[i].to}:</span>${resposta[i].text}</div>`;
        }
    }
    window.scrollTo(0, document.body.scrollHeight);
}

setInterval(mantemConectado, 2000);

function mantemConectado() {
    let nomeDado = {
        name: nome
    };
    axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nomeDado);
    console.log(nomeDado)
}

function sendMessage() {
    const text = document.querySelector(".areaMessage");
    const textMessage = {
        from: nome,
        to: "Todos",
        text: text.value,
        type: "message"
    };
    console.log(textMessage);
    const sendMessages = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", textMessage);
    console.log(textMessage);
    text.value = "";
    sendMessages.then(sucess);
    sendMessages.catch(failed);

    function sucess() {
        const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
        promessa.then(chargeMessages);

    }

    function failed() {
        alert("Sua mensagem não pode ser enviada. Algo deu errado :/");
        window.location.reload();
    }
}


function participants() {
    const buttonParticipants = document.querySelector(".top .button");
    const show = document.querySelector(".mask");
    show.classList.remove("hidden");
    console.log(buttonParticipants);
}

function back() {
    const buttonback = document.querySelector(".mask");
    buttonback.classList.add("hidden");
    console.log(buttonback);
}