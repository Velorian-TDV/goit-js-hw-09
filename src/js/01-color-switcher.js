const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

startButton.addEventListener('click', () => {

    intervalId = setInterval(() => {
        body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;

});

stopButton.addEventListener('click', () => {

    clearInterval(intervalId);

    startButton.disabled = false;
    stopButton.disabled = true;

});