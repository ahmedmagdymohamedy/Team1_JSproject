// Global Variables

var productsTemp = document.querySelector("#products");
var cardsTemp = document.querySelector("#cards");
var totalProducts = document.querySelector("#total");

// Products
var products = [];
//current products will showen on page
var currentProducts = [];
//Cart Products
var cardProducts = [];

function onloadPage() {
  //Ahmed magdy (Done)
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((json) => {
      products = json.products;
      console.log(json.products);
      currentProducts = products;
      reBuildProductTemp();
    });
}

function reBuildProductTemp() {
  // set the products cards to html body
  var innerhtml = "";
  for (let i = 0; i < currentProducts.length; i++) {
    innerhtml += `
        <div class="card col-4 bg-dark text-light border border-light flex-center-all m-1" style="width: 12rem;>
        <img src="${currentProducts[i].images[0]}" class="card-img-top" alt="product" >
        <div class="card-body">
            <h6 class="card-title text-warning pointer" onclick="openProduct(${currentProducts[i].id})">${currentProducts[i].title}</h6>
            <p class="card-text">${currentProducts[i].description}</p>
                <h6 class="card-text">Price : ${currentProducts[i].price} L.E</h6>
            <a class="btn btn-warning" onclick="addToCard(${currentProducts[i].id})" >Add To Cart</a>
        </div>
        </div>
        `;
  }
  productsTemp.innerHTML = innerhtml;
  reGetCard();
}

function reGetCard() {
  // set initial card products values from local storage -- if user used our web side before .
  var cardResult = JSON.parse(localStorage.getItem("cardProducts"));
  //check if user not have local storage data -- that is mean the user is first time to open our web side .
  if (cardResult != null) {
    cardProducts = cardResult;
  }
  reBuildCardTemp();
}

function reBuildCardTemp() {
  // Ahmed Magdy task (done)
  // loop on cardsProducts and add it to html on card template.
  var innerhtml = "";
  for (var i = 0; i < cardProducts.length; i++) {
    innerhtml += `
        <div class="card mb-3 bg-dark text-light border-light" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-3">
                <img src="${
                  cardProducts[i].images[0]
                }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                <div class="row">
                <h5 class="col card-title"> ${cardProducts[i].title}</h5>
                <button  type="button" onclick="deleteFromCard(${
                  cardProducts[i].id
                })" class="btn-close btn-close-white col-2" aria-label="Close"></button>
            </div>
            <div class="row ">
            <div class="col-8">
                <span ">count : ${cardProducts[i].count} </span>
                
            </div>
                <div class="col-12">Price : ${
                  cardProducts[i].price * cardProducts[i].count
                } L.E
                </div>
                <div class="row">
                <button style="width:20%;" type="button" class=" btn btn-warning m-1" onclick="decreaseCount(${
                  cardProducts[i].id
                })">-</button>
                <button style="width:20%;" type="button" class=" btn btn-warning m-1" onclick="increaseCount(${
                  cardProducts[i].id
                })">+</button>
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>
        `;
  }
  // but it on innerHTML on cardTemp.
  cardsTemp.innerHTML = innerhtml;
  // ReCalculate Total.
  reCalculateTotal();
}

function reCalculateTotal() {
  // Mohamed Ali task (Done)
  // loop card products and add price to total var * count
  var total = 0;
  for (var i = 0; i < cardProducts.length; i++) {
    total += cardProducts[i].price * cardProducts[i].count;
  }
  // set the total value to html
  totalProducts.innerHTML = total + " L.E";
}

function openProduct(prID) {
  //Mohamed Aly task (Done)
  let currentProduct = getProductById(prID);
  sessionStorage.setItem("currentProduct", JSON.stringify(currentProduct));
  window.open("product.html", "_blank");
}

function getProductById(prID) {
  // find the product whose have the same id and return it .
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === prID) {
      return products[i];
    }
  }
}

//Events

function addToCard(prID) {
  // check if the product is already on cardsProducts and if not found -->> increaseCount() not add product
  for (let i = 0; i < cardProducts.length; i++) {
    if (cardProducts[i].id == prID) {
      increaseCount(prID);
      return;
    }
  }

  var product = getProductById(prID);
  product.count = 1;

  cardProducts.push(product);
  saveCardProducts();
  reBuildCardTemp();
}

function saveCardProducts() {
  // re save cardsProducts to local storage after any changes.
  localStorage.setItem("cardProducts", JSON.stringify(cardProducts));
}

function deleteFromCard(prID) {
  // Mohamed Ali task (done)
  // delete item from card products.
  for (let i = 0; i < cardProducts.length; i++) {
    if (cardProducts[i].id == prID) {
      cardProducts.splice(i, 1);
      break;
    }
  }
  // delete from localStorage
  saveCardProducts();
  reBuildCardTemp();
}

function deleteAllProducts() {
  // Mohamed Aly task (done)
  // check if have cards items or no .
  if (cardProducts.length == 0) {
    return;
  }
  // delete all items from card products .

  if (confirm("Are you sure you want to delete your products from cart ?")) {
    localStorage.removeItem("cardProducts");
    cardProducts = [];
    reBuildCardTemp();
  }
}

function increaseCount(prID) {
  //  Ahmed Mohamed Abo Zeid task (done)
  // add count 1 to product count
  for (let i = 0; i < cardProducts.length; i++) {
    // find the product and add 1 to count.
    if (cardProducts[i].id == prID) {
      cardProducts[i].count++;
      break;
    }
  }
  reBuildCardTemp();
}

function decreaseCount(prID) {
  //  Ahmed Mohamed Abo Zeid task (done)
  // decrease count 1 from product count

  for (let i = 0; i < cardProducts.length; i++) {
    if (cardProducts[i].id == prID) {
      cardProducts[i].count--;
      // check if count >= 0  -- delete it from card product
      if (cardProducts[i].count <= 0) {
        deleteFromCard(prID);
      }
      break;
    }
  }
  saveCardProducts();
  reBuildCardTemp();
}

function onChangeSearchKeyWord(newKeyWord) {
  currentProducts = products.filter((e) =>
    e["title"].toUpperCase().includes(newKeyWord.value.toUpperCase())
  );
  reBuildProductTemp();
}

// setTimeout(() => {
//   onChangeSearchKeyWord("Ergo");
// }, 3000)
