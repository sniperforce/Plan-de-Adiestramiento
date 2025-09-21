let counter = 0;

const displayText = document.querySelector('.counter-text');

const buttonElement = document.querySelector('button');
buttonElement.addEventListener('click', () => {
  counter++;
  displayText.innerHTML = counter;
});
