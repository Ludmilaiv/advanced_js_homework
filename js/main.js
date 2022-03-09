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