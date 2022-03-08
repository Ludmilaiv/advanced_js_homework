const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = ({title = 'untitled', price = 0}, image='./img/no-image.jpg') => {
    return `<div class="product-item">
                <img class="product-item__photo" src="${image}" alt="${title}"> 
                <h3 class="product-item__title">${title}</h3>
                <p class="product-item__price">${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

/* Ответ на задание 3.
Запятая появлялась по причине того, что в свойство innerHTML мы помещали массив.
Для решения этой проблемы можно перебрать массив и добавить к innerHTML каждый из элементов. 
Но если товаров много, такой способ будет не очень продуктивным. Поэтому просто с помощью join 
склеим массив строк в одну строку */

renderPage(products);