class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
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
    constructor(product,img='./img/no-image.jpg'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                <img class="product-item__photo" src="${this.img}" alt="${this.title}"> 
                <h3 class="product-item__title">${this.title}</h3>
                <p class="product-item__price">${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class CartList {
    constructor() {
        this.products = new ProductList('.cart');
    }
    addProduct(product) {
        this.products.goods.push(product);
    }
    removeProduct(productID) {
        this.products.goods = this.products.goods.filter(product => product.id !== productID);
    }
}

let list = new ProductList();

// *Задание 3

class Hamburger {
    constructor(size = 'small', stuffing = null) { 
        if (size === 'big') {
            this.price = 50;
            this.calories = 20;
        } else if (size === 'small') {
            this.price = 100;
            this.calories = 40;
        } 
        if (stuffing === 'cheese') {
            this.price += 10;
            this.calories += 20;
        } else if (stuffing === 'salad') {
            this.price += 20;
            this.calories += 5;
        } else if (stuffing === 'potato') {
            this.price += 15;
            this.calories += 10;
        }
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }
    addTopping(topping = 'mayonnaise') {
        this.toppings.push(topping);
    }
    removeTopping(topping) {
        if (topping === 'seasoning') {
            this.price -= 15;
        } else {
            this.price -= 20;
            this.calories -= 5;
        }
        this.toppings = this.toppings.filter(item => item !== topping);
    }
    getToppings() {
        return this.toppings;
    }
    getSize() {
        return this.size;
    }
    getStuffing() {
        return this.stuffing;
    }
    calculatePrice() {
        if (this.size === 'big') {
            this.price = 50;
        } else if (size === 'small') {
            this.price = 100;
        } 
        if (this.stuffing === 'cheese') {
            this.price += 10;
        } else if (this.stuffing === 'salad') {
            this.price += 20;
        } else if (this.stuffing === 'potato') {
            this.price += 15;
        }
        if (this.toppings.includes('seasoning')) {
            this.price += 15;
        } 
        if (this.toppings.includes('mayonnaise')) {
            this.price += 20;
        }
        return this.price;
    }
    calculateCalories() {
        if (this.size === 'big') {
            this.calories = 20;
        } else if (size === 'small') {
            this.calories = 40;
        } 
        if (this.stuffing === 'cheese') {
            this.calories += 20;
        } else if (this.stuffing === 'salad') {
            this.calories += 5;
        } else if (this.stuffing === 'potato') {
            this.calories += 10;
        }
        if (this.toppings.includes('mayonnaise')) {
            this.calories += 5;
        }
        return this.price;
    }
  }

  const burger = new Hamburger('big', 'salad');
  burger.addTopping('mayonnaise');
  console.log(burger.getSize(), burger.getStuffing(), burger.getToppings(), burger.calculatePrice(), burger.calculateCalories());