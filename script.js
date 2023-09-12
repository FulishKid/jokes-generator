const select = document.getElementById('select');
const btn = document.getElementById('joke-btn');
const div = document.getElementById('joke');
const divContent = document.getElementById('joke-content');
const xhrCategory = new XMLHttpRequest();
const xhrJoke = new XMLHttpRequest();
let apiURL = `https://api.chucknorris.io/jokes/random`;

function createCategoryOptions() {
  xhrCategory.open('GET', 'https://api.chucknorris.io/jokes/categories');
  xhrCategory.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      data.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.appendChild(document.createTextNode(category));

        select.appendChild(option);
      });
    }
  };
  xhrCategory.send();
}

function checkForCategory() {
  select.addEventListener('change', (e) => {
    const category = e.target.value;
    if (category !== 'all') {
      apiURL = `https://api.chucknorris.io/jokes/random?category=${category}`;
    } else apiURL = `https://api.chucknorris.io/jokes/random`;
  });
}

function getJoke() {
  xhrJoke.open('GET', apiURL);
  xhrJoke.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        divContent.innerHTML = '';

        const data = JSON.parse(this.responseText);
        const b = document.createElement('b');

        b.appendChild(document.createTextNode(`"${data.value}"`));
        divContent.style.marginBottom = '25px';
        divContent.appendChild(b);
      } else divContent.innerHTML = 'Something went wrong(';
    }
  };
  xhrJoke.send();
}

document.addEventListener('DOMContentLoaded', getJoke);
createCategoryOptions();
checkForCategory();
btn.addEventListener('click', getJoke);
