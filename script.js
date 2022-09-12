
const products = [
    {
        id: 0,
        name: "iPhone x",
        description: "asdasdasdASDASD asdas dasd sa",
        price: 1000,
        src: "imgs/f1.jpg"
    },
    {
        id: 1,
        name: "gelly",
        description: "asdasdasdASDASD asdas dasd sa",
        price: 1000,
        src: "imgs/f2.jpg"
    },
    {
        id: 2,
        name: "BMW",
        description: "asdasdasdASDASD asdas dasd sa",
        price: 1000,
        src: "imgs/f3.jpg"
    },
    {
        id: 3,
        name: "Marcides",
        description: "asdasdasdASDASD asdas dasd sa",
        price: 1000,
        src: "imgs/f4.jpg"
    },
    {
        id: 4,
        name: "caddy",
        description: "asdasdasdASDASD asdas dasd sa",
        price: 1000,
        src: "imgs/food.jpg"
    }
];

var cardProducts = [];


var productsTemp = document.getElementById("products");
var cardsTemp = document.getElementById("cards");

function onloadPage() {
    var innerhtml = '';
    for (let i = 0; i < products.length; i++) {
        innerhtml += `
        <div class="card col-6" style="width: 18rem;">
        <img src="${products[i].src}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${products[i].name}</h5>
            <p class="card-text">${products[i].description}</p>
                <p class="card-text">${products[i].price} $</p>
            <a class="btn btn-primary" onclick="addToCard(${products[i].id})" >add to card</a>
        </div>
        </div>
        `;
    }
    productsTemp.innerHTML = innerhtml;

    reGetCard();
}

function reGetCard() {
    // set initial card products valus.
    var cardResult = JSON.parse(localStorage.getItem("cardProducts"));
    if (cardResult != null) {
        cardProducts = cardResult;
    }
}

function getProductById(prID) {
    // find the product whose have the same id
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === prID) {
            return products[i];
        }
    }
}

function addToCard(prID) {
    // check if the product is already on cardsProducts or no -->> increaseCount() not add product

    var product = getProductById(prID);
    product.count = 1;

    cardProducts.push(product);
    saveCardProducts();
    reBuildCardTemp();
}

function saveCardProducts() {
    localStorage.setItem("cardProducts", JSON.stringify(cardProducts));
}

function reBuildCardTemp() {
    // Ahmed Magdy
    // loop on cardsProducts.
    // but it on innerHTML on cardTemp.
    // Re Calcolate Total.
    reCalcolateTotal();
    // ...
}

function reCalcolateTotal() {
    // Mohamed Ali
    // loop card products and add price to total var * count
}

function deleteFromCard(prID) {
    // Mohamed Ali
    // delete from list.
    for (let i = 0; i < cardProducts.length; i++) {
        // find the product and splice it.
    }
    // delete from localStorage (Done).
    saveCardProducts();
    reBuildCardTemp();
}

function increaseCount(prID) {
    // abo Zeaid tyyyyyyiz
    for (let i = 0; i < cardProducts.length; i++) {
        // find the product and add 1 to count.
    }
    saveCardProducts();
    reBuildCardTemp();
}

function decreaseCount(prID) {
    // abo Zeaid tyyyyyyiz 
    // delete one from count to product .
    // if count < 1 delete the product .
    saveCardProducts();
    reBuildCardTemp();
}