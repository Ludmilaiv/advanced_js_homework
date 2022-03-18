let text = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store.'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
    Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure. Bye.'`;

let reg = /\B'/gi;

text = text.replace(reg, '"');

alert(`Задания 1 и 2:\n\n ${text}`);

const regs = {
  name: /(\w|[а-яА-ЯёЁ])+/i,
  phone: /\+7\(\d{3}\)\d{3}-\d{4}/i,
  email: /\w|\d+(\.|-){0,1}\w|d+@\w+\.\w{2,3}/i
}

const clearError = (i) => {
  document.querySelectorAll('.error-input').forEach(input => {
    input.classList.remove('error-input');
  });
  document.querySelectorAll('.error-message').forEach(err => err.remove());
}

const onSubmit = (e) => {
  e.preventDefault();
  clearError();
  const inputs = e.target.querySelectorAll('input');  
  inputs.forEach(elem => {
    if (!regs[elem.id].test(elem.value)) {
      elem.classList.add('error-input');
      const err = document.createElement('div');
      err.classList.add('error-message');
      err.innerHTML = 'Неверный формат данных';
      elem.after(err);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', onSubmit);
});