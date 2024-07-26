const productId = new URLSearchParams(location.search).get("productId");
console.log("PRODUCTID", productId);

if (productId) {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero del singolo prodotto!!");
      }
    })
    .then((singleProduct) => {
      console.log("SINGLEPRODUCT", singleProduct);
      document.getElementById("name").value = singleProduct.name;
      document.getElementById("description").value = singleProduct.description;
      document.getElementById("brand").value = singleProduct.brand;
      document.getElementById("imageUrl").value = singleProduct.imageUrl;
      document.getElementById("price").value = singleProduct.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  console.log("nameInput", nameInput);


  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  const brandValue = brandInput.value;
  const imageUrlValue = imageUrlInput.value;
  const priceValue = priceInput.value;

  const newProduct = new Product(
    nameValue,
    descriptionValue,
    brandValue,
    imageUrlValue,
    priceValue
  );

  let methodToUse;
  if (productId) {
    methodToUse = "PUT";
  } else {
    methodToUse = "POST";
  }

  const URL = "https://striveschool-api.herokuapp.com/api/product/";

  let URLToUse;
  if (productId) {
    URLToUse = URL + productId;
  } else {
    URLToUse = URL;
  }

  fetch(URLToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO SALVATO!");
      } else {
        alert("ERRORE NEL SALVATAGGIO!");
        throw new Error("Errore nel salvataggio del prodotto!");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});
