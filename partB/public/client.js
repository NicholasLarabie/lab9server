const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const username = document.getElementById('username');

function getRandomHexColour() {
    const hex = Math.floor(Math.random() * 0xfffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (username.value && input.value) {
        socket.emit ('message', {
            username: username.value,
            message: input.value
        });

        input.value = " ";
    }
})

socket.addEventListener('message', (msg) => {
    const li = document.createElement('li');
    const span = document.createElement('span');

    span.className = "username";
    span.style.color = getRandomHexColour();
    span.textContent = msg.username;
    li.append(span, `: ${msg.message}`);
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;

});