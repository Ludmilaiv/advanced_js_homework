class Product {
    static count = 0;
    constructor(title, price) {
        this.id = ++Product.count;
        this.title = title;
        this.price = price;
    }
    render(image='./img/no-image.jpg') {
        return `<div class="product-item">
                <img class="product-item__photo" src="${image}" alt="${this.title}"> 
                <h3 class="product-item__title">${this.title}</h3>
                <p class="product-item__price">${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}
class GoodsList {
    constructor(products = []) {
        this.products = products;
    }
    addProduct(product) {
        this.products.push(product);
    }
    removeProduct(productID) {
        this.products = this.products.filter(product => product.id !== productID);
    }
    getTotalPrice() {
        let totalPrice = 0;
        this.products.forEach(product => totalPrice += product.price);
        return totalPrice;
    }
    render() {
        const productsList = this.products.map(item => item.render());
        console.log(productsList);
        document.querySelector('.products').innerHTML = productsList.join('');
    }
}
const products = new GoodsList();
products.addProduct(new Product('Notebook', 2000));
products.addProduct(new Product('Mouse', 20));
products.addProduct(new Product('Keyboard', 200));
products.addProduct(new Product('Gamepad', 50));

products.render();

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