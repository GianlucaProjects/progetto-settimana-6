// com'è fatto l'oggetto di un concerto?
// campi necessari:
// "name" -> string
// "description" -> string
// "price" -> number/string
// "time" -> string (data e ora)

// - PARTE FINALE DELLA LEZIONE -
// nel caso la pagina backoffice si caricasse con un parametro "eventId" nella barra
// degli indirizzi, significa che non sono arrivato qui cliccando il bottone "backoffice"
// nella navbar ma cliccando il tasto MODIFICA da uno degli eventi.
// questo comporta che la mia pagina backoffice deve entrare in "modalità modifica":
// - deve fare una fetch singola per i dettagli dell'evento con quell_id
// - deve ri-popolare i campi del form con i dati risultanti dalla fetch
// - il tasto SALVA non deve fare una POST, ma una PUT (per modificare l'evento con quell'id)

const productId = new URLSearchParams(location.search).get("productId");
// eventId può essere O una stringa, O null
console.log("PRODUCTID", productId);

if (productId) {
  // se entro qui, vuol dire che sono in "modalità modifica"
  // 1) fetch individuale per recuperare i dettagli, COME nella pagina DETAILS!
  fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
    },
  })
    .then((response) => {
      if (response.ok) {
        // la chiamata è andata a buon fine
        return response.json();
      } else {
        throw new Error("Errore nel recupero del singolo prodotto!!");
      }
    })
    .then((singleProduct) => {
      console.log("SINGLEPRODUCT", singleProduct);
      // 2) ri-popolo i campi del form con i dati dell'evento
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

// cerchiamo il form del concerto e interveniamo sul suo evento di submit
const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", function (e) {
  e.preventDefault(); // bloccare il riavvio della pagina
  // recupero i riferimenti degli input
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("imageUrl");
  const priceInput = document.getElementById("price");

  console.log("nameInput", nameInput);

  // recuperi i VALORI di questi riferimenti (il contenuto dei campi)

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;
  const brandValue = brandInput.value;
  const imageUrlValue = imageUrlInput.value;
  const priceValue = priceInput.value;

  // costruiremo l'oggetto con le 4 proprietà sopra

  // lo creo a manina
  // const newConcert = {
  //   name: nameValue,
  //   description: descriptionValue,
  //   price: priceValue,
  //   time: timeValue,
  // }

  // lo creo con una classe
  const newProduct = new Product(
    nameValue,
    descriptionValue,
    brandValue,
    imageUrlValue,
    priceValue
  );

  let methodToUse;
  if (productId) {
    // modalità modifica
    methodToUse = "PUT";
  } else {
    // modalità creazione
    methodToUse = "POST";
  }

  const URL = "https://striveschool-api.herokuapp.com/api/product/";

  let URLToUse;
  if (productId) {
    // modalità modifica
    URLToUse = URL + productId;
  } else {
    // modalità creazione
    URLToUse = URL;
  }

  // LA POST LAVORA SULL'INDIRIZZO NORMALE, "GENERICO" (/agenda)
  // LA PUT (come la DELETE) LAVORA SULL'INDIRIZZO COMPLETO DI _ID (/agenda/66a249e85f8bd800152f8cde)

  // chiamata fetch() per fare una POST del concerto appena compilato
  // per fare una chiamata POST, l'URL è lo stesso della chiamata GET
  // ...se l'API è stata costruita secondo i principi REST
  fetch(URLToUse, {
    // definiamo il metodo da utilizzare (altrimenti sarebbe GET di default)
    method: methodToUse,
    // alleghiamo alla chiamata l'oggetto che abbiamo costruito precedentemente
    body: JSON.stringify(newProduct), // le API si aspettano un oggetto stringhifizzato
    headers: {
      // informiamo l'API che la stringa che stiamo mandando in origine era un oggetto
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
    },
  })
    .then((response) => {
      if (response.ok) {
        // se il concerto è stato salvato correttamente
        // non è indispensabile estrapolare il JSON da una chiamata POST,
        // perchè non otterremmo altro che il concerto che volevamo salvare!
        // ci fermiamo qua!
        alert("PRODOTTO SALVATO!");
      } else {
        // se il concerto NON è stato salvato a causa di un problema
        alert("ERRORE NEL SALVATAGGIO!");
        throw new Error("Errore nel salvataggio del prodotto!");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});
