const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    formData.email = typeof parsed.email === 'string' ? parsed.email : '';
    formData.message = typeof parsed.message === 'string' ? parsed.message : '';
    email.value = formData.email;
    message.value = formData.message;
  }
} catch {

}


form.addEventListener('input', e => {
  const { name, value } = e.target;
  if (name !== 'email' && name !== 'message') return;

  const trimmed = value.trimStart(); 
  formData = { ...formData, [name]: trimmed };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', e => {
  e.preventDefault();

  formData.email = email.value.trim();
  formData.message = message.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
});
