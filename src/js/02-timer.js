import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import Notiflix from "notiflix";

const datetime_picker = document.getElementById('datetime-picker');
const start = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let countdownInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        const selectedDate = new Date(selectedDates[0]).getTime();
        const dateNow = new Date().getTime();
        let timeDifference = convertMs(selectedDate - dateNow);

        clearInterval(countdownInterval);

        if (selectedDate < dateNow) {
        
            start.disabled = true;
            
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            
            Notiflix.Notify.failure('Error, date cannot be less than current date!');
        
        } else {
        
            start.disabled = false;

            days.textContent = addZero(timeDifference.days);
            hours.textContent = addZero(timeDifference.hours);
            minutes.textContent = addZero(timeDifference.minutes);
            seconds.textContent = addZero(timeDifference.seconds);
            
            Notiflix.Notify.success('The date is correct, press the START button');
        
        }
    },
};

function addZero(value) {

    if (value === undefined) {
        return "00";
    }

    return value.toString().padStart(2, "0");

}

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };

}

flatpickr(datetime_picker, options);

start.addEventListener('click', () => {

    Notiflix.Notify.info('The countdown has begun');

    clearInterval(countdownInterval);
    
    const selectedDate = new Date(datetime_picker.value).getTime();
    const dateNow = new Date().getTime();
    let timeDifference = selectedDate - dateNow;

    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);

    function updateCountdown() {

        timeDifference -= 1000;

        if (timeDifference <= 0) {

            clearInterval(countdownInterval);
            return Notiflix.Notify.success("Countdown finished");
        
        }

        const timeRemaining = convertMs(timeDifference);

        days.textContent = addZero(timeRemaining.days);
        hours.textContent = addZero(timeRemaining.hours);
        minutes.textContent = addZero(timeRemaining.minutes);
        seconds.textContent = addZero(timeRemaining.seconds);

    }

});