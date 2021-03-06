import { open, close } from './toggleModal';

const bookingOverlay = document.querySelector('.booking .modal-overlay');
const heroButton = document.querySelector('.hero-button');
const offerButtons = document.querySelector('.offers-blocks');

const form = document.querySelector('.booking form');
const name = document.querySelector('[type=text]');
const email = document.querySelector('[type=email]');
const age = document.querySelector('[name=age]');
const level = document.querySelector('[name=level]');

const submitted = document.querySelector('.modal-submitted');
const submitResult = document.querySelector('.modal-submitted__result');

function toggleOffers(e) {
  open(bookingOverlay);
  level.value = e;
}

function modalSubmitted(data, header) {
  if (data) {
    submitResult.querySelector('p').textContent = header;
    submitResult.querySelector('pre').textContent = data;
    submitResult.classList.add('modal-show');
    setTimeout(() => submitResult.classList.remove('modal-show'), 7000);
  } else {
    submitted.classList.add('modal-show');
    setTimeout(() => submitted.classList.remove('modal-show'), 2000);
  }
}

function submitForm() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = {
    name: name.value,
    email: email.value,
    age: age.value,
    level: level.value,
  };
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) =>
        modalSubmitted(
          JSON.stringify(json, null, ' '),
          'Data sent successfully'
        )
      );
  } catch (error) {
    modalSubmitted(error, 'Error');
  }
}

heroButton.addEventListener('click', () => open(bookingOverlay));

offerButtons.addEventListener('click', (e) => {
  if (e.target.matches('[name=beginner]')) {
    toggleOffers('beginner');
  }
  if (e.target.matches('[name=intermediate]')) {
    toggleOffers('intermediate');
  }
  if (e.target.matches('[name=advanced]')) {
    toggleOffers('advanced');
  }
});

bookingOverlay.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) close(bookingOverlay);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
  e.target.reset();
  close(bookingOverlay);
  modalSubmitted();
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') close(bookingOverlay);
});
