// questa pagina dettagli dovrà mostrare le informazioni di SOLAMENTE UN CONCERTO
// come faccio a capire quale mostrare?
// il link che mi ha portato qui (vedi index.js) contiene un parametro, che si chiama
// "eventId". Il valore di questo parametro è l'_id dell'evento che mi ha portato
// alla pagina dei dettagli

// ora RECUPERO quell'eventId dalla barra degli indirizzi e lo userò per fare una
// fetch MOLTO specifica che non mi tornerà come su index.js TUTTI i concerti,
// ma solamente UN oggetto: i dettagli del concerto con quell'_id

// location.search è il contenuto della BARRA degli INDIRIZZI del browser
const addressBarParameters = new URLSearchParams(location.search);
const productId = addressBarParameters.get("productId"); // questo torna l'_id nella barra degli indirizzi
console.log("productId", productId);

// scorciatoia x Aldo
// const eventId = new URLSearchParams(location.search).get('eventId')

// perchè mi serve l'_id della risorsa che voglio recuperare?
// -> GET su /api/agenda --> mi torna TUTTI i concerti
// -> GET su /api/agenda/66a21c8d5f8bd800152f8cd8 --> mi torna SOLO la risorsa con quell'_id

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
    console.log(singleProduct);
    // questi sono i dettagli di UN evento nello specifico
    // ora genero la CARD in centro alla pagina
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
  // qui eliminerò l'evento che vedo nella pagina
  // una DELETE ha bisogno dell'_id dell'elemento da rimuovere
  // bisogna fare una fetch su URL_GENERICO + ID con method 'DELETE'
  fetch(urlToFetch + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTVhMmYyNjBjYzAwMTVjYzBkZDMiLCJpYXQiOjE3MjE5ODAzMjIsImV4cCI6MTcyMzE4OTkyMn0.K8dAEILdEyjnfccnSUKslX3XS2X_klceNiDjvBZkkuc",
    },
    method: "DELETE",
  }) // es. https://striveschool-api.herokuapp/api/agenda/66a21c8d5f8bd800152f8cd8
    .then((response) => {
      if (response.ok) {
        // ELIMINAZIONE ANDATA A BUON FINE
        alert("PRODOTTO ELIMINATO");
        location.assign("./index.html"); // riporta l'utente in homepage
      } else {
        // PROBLEMA NELL'ELIMINAZIONE
        throw new Error("Problema nell'eliminazione del prodotto corrente!");
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};

// RECAP DEGLI URL DA UTILIZZARE
// GET: potete utilizzare l'URL "generico" per ottenere TUTTI i risultati
// GET: potete utilizzare l'URL "generico" + "id" per ottenere UN risultato specifico
// POST: potete utilizzare l'URL "generico" per salvare un nuovo elemento
// DELETE: potete utilizzare l'URL "generico" + "id" per eliminare UN risultato specifico
// PUT: potete utilizzare l'URL "generico" + "id" per modifica UN risultato specifico

// "body" e "Content-Type" si utilizzano solamente nella POST e nella PUT
