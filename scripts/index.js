const getProducts = function () {
  const URL = "https://striveschool-api.herokuapp.com/api/product/";
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Si è verificato un errore nella chiamata, response non OK!"
        );
      }
    })
    .then((arrayOfEvents) => {
      arrayOfEvents.forEach((product) => {
        const newProductCol = `
              <div class="col">
                  <div class="card">
                      <img
                          src="${product.imageUrl}"
                          class="card-img-top"
                          alt="product pic"
                      />
                      <div class="card-body text-center">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text">${product.description}</p>
                          <p class="card-text">${product.brand}</p>
                          <p class="card-text">${product.price}€</p>
                          <a href="./details.html?productId=${product._id}" class="btn btn-primary w-100">Vai ai dettagli</a>
                      </div>
                  </div>
              </div>
              `;
        const productRow = document.getElementById("product-row");
        productRow.innerHTML = productRow.innerHTML + newProductCol;
      });
    })
    .catch((error) => {
      console.log("ERRORE!", error);
    });
};

getProducts();
