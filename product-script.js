var productInPage = JSON.parse(sessionStorage.getItem("currentProduct"));
var divProduct = document.getElementById("currentProduct");

function buildCurrentProduct() {
  //Mohamed Aly Task (Done)
  // set the Current product card to html body
  var innerhtml = "";
  innerhtml = `
    <div class="row">
    <!-- carousel -->
    <div
      id="carouselExampleControls"
      class="carousel slide col-lg-4"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner my-slider">
        <div class="carousel-item active ">
          <img src="${productInPage.images[0]}" class="d-block w-100 " alt="..." />
        </div>
        <div class="carousel-item">
          <img src="${productInPage.images[1]}" class="d-block w-100 " alt="..." />
        </div>
        <div class="carousel-item">
          <img src="${productInPage.images[2]}" class="d-block w-100 " alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- Product Info  -->
    <div class="info text-light col-lg-7">
      <h2 class="display-6 text-light mb-4 fw-lighter">${productInPage.title}</h2>
      <p class="descriptionPara">
      ${productInPage.description}
      </p>
      <h5 class="text-light mb-4 fw-lighter">Price :${productInPage.price}</h5>
    </div>
  </div>
        `;
  divProduct.innerHTML = innerhtml;
}
