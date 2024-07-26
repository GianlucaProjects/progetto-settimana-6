const addressBarParameters = new URLSearchParams(location.search);
const productId = addressBarParameters.get("productId");

const urlToFetch = "https://striveschool-api.herokuapp.com/api/product/";

fetch(urlToFetch + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERRORE NELLA FETCH SINGOLA");
    }
  })
  .then((singleProduct) => {
    const detailRow = document.getElementById("detail-row");
    detailRow.innerHTML = `
        <div class="col-12 col-md-8 text-center">
            <div class="card pb-4">
            <img src="${singleProduct.imageUrl}" class="card-img-top" alt="product">
            <div class="card-body">
                <h5 class="card-title">${singleProduct.name}</h5>
                <p class="card-text">${singleProduct.description}</p>
                <p class="card-text">${singleProduct.brand}</p>
                <a href="#" class="btn btn-primary">${singleProduct.price}€ COMPRA</a>
            </div>
                <div class="border border-danger border-2 fit-content mx-auto p-3">
                    <h3>TASTI ADMIN</h3>
                    <div>
                        <a href="./backoffice.html?eventId=${singleProduct._id}" class="btn btn-warning">MODIFICA</a>
                        <button class="btn btn-danger" onclick="deleteProduct()">ELIMINA</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  })
  .catch((err) => {
    console.log(err);
  });

const deleteProduct = function () {
  fetch(urlToFetch + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
    },
    method: "DELETE",
  }) 
  .then((response) => {
      if (response.ok) {
        alert("PRODOTTO ELIMINATO");
        location.assign("./index.html");
      } else {
        throw new Error("Problema nell'eliminazione del prodotto corrente!");
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
