import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onTextareaInput, 500));

initForm();

function onTextareaInput(evt) {
  let parsedUserData = localStorage.getItem('feedback-form-state');
  parsedUserData = parsedUserData ? JSON.parse(parsedUserData) : {};

  parsedUserData[evt.target.name] = evt.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(parsedUserData));
}
function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
 console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
function initForm() {
  const savedUserData = localStorage.getItem('feedback-form-state');

  if (savedUserData) {
    const parsedUserData = JSON.parse(savedUserData);
    Object.entries(parsedUserData).forEach(([name, value]) => {
      feedbackForm.elements[name].value = value;
    });
  }
}
