const form = document.querySelector('#chat-form');
const chatSection = document.querySelector('#chat-section');
const loginSection = document.querySelector('#login-section');
const mainChatSection = document.querySelector('#main-chat-section');
const loginForm = document.querySelector('#login-form');

const socket = io();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = form.elements[0].value;
    if (!msg) {
        alert('Message is empty');
        return;
    }

    if (msg.trim().length === 0) {
        alert('Message is empty');
        return;
    }

    socket.emit('send-msg', { data: msg });
    form.elements[0].value = "";
});

function createMessage(username, message) {
    return `<p class="rounded-pill border p-2"><span class="fw-bold">${username}</span>: ${message}</p>`
}

function addMessageToDisplay(event) {
    const messageHtml = createMessage(event.username, event.msg);
    const div = document.createElement('div');
    div.innerHTML = messageHtml;
    chatSection.append(div);
}

socket.on('recived-msg', function (event) {
    addMessageToDisplay(event);
});

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = loginForm.elements[0].value;
     if (!username) {
        alert('Message is empty');
        return;
    }

    if (username.trim().length === 0) {
        alert('Message is empty');
        return;
    }

    socket.emit('user-login', { username: username });
    mainChatSection.classList.remove('d-none');
    loginSection.classList.add('d-none')
})

function initilizeApp() {
    mainChatSection.classList.add('d-none')
}

initilizeApp();


