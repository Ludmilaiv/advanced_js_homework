const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => {
                this.goods = data;  
                this.render();
            });
    }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    getTotalPrice() {
        return this.totalPrice = this.goods.forEach(product => totalPrice += product.price);
    }
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
       }
    }
}

class ProductItem{
    constructor(product, block='product',img='./img/no-image.jpg'){
        this.block = block;
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
        this.quantity = product.quantity;
    }
    render(){
        return `<div class="${this.block}-item">
                <img class="${this.block}-item__photo" src="${this.img}" alt="${this.title}"> 
                <h3 class="${this.block}-item__title">${this.title}</h3>
                <p class="${this.block}-item__price">${this.price}</p>
                ${(this.block === 'product') ? '<button class="buy-btn">Купить</button>' : `<span class="cart-item__quantity">${this.quantity}</span>`}
            </div>`
    }
}

class CartList{
    constructor(container='.cart__container'){
        this.container = container;
        this.goods = [];
        this._getBasket()
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.goods = data.contents;
                this.render();
            });
    }
    _getBasket(){
      
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product, 'cart');
            block.insertAdjacentHTML("beforeend",item.render());
       }
       block.insertAdjacentHTML("beforeend",`<div class="cart__total">Общая стоимость:${this.amount}</div>`);
    }
}

let list = new ProductList();
let cart = new CartList();

document.addEventListener('DOMContentLoaded', () => {
    const cartPopup = document.querySelector('.cart');
    document.querySelector('.btn-cart').addEventListener('click', () => {
        cartPopup.classList.toggle('cart_show');
    })
})
