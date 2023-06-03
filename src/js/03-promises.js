import { Notify } from "notiflix";

const form = document.querySelector('.form');
const delayInput = document.querySelector(`input[name='delay']`);
const stepInput = document.querySelector(`input[name='step']`);
const amountInput = document.querySelector(`input[name='amount']`);

function createPromise(position, delay) {

    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
    
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });    
            }
        }, delay);
    
    });

}

form.addEventListener('submit', event => {

    event.preventDefault();

    const delay = Number(delayInput.value);
    const step = Number(stepInput.value);
    const amount = Number(amountInput.value);

    let timeIncrement = delay;

    for (let amountIncrement = 1; amountIncrement <= amount; amountIncrement++) {
        createPromise(amountIncrement, timeIncrement)
            .then(data => {
                Notify.success(`Fulfilled promise ${data.position} in ${data.delay}ms`);
            })
            .catch(err => {
                Notify.failure(`Rejected promise ${err.position} in ${err.delay}ms`);
            });

        timeIncrement += step;
    }

});