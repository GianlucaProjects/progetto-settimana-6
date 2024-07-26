// in questa pagina io devo RECUPERARE con una fetch() i miei eventi a DB
// e li devo mostrare nella pagina
// per farlo, creerò per ogni evento esistente una colonna che appenderò
// allo "scheletro" imbastito nel file html

const getEvents = function () {
  // fetch!
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
        // OK!
        // proseguiamo, e cerchiamo di estrarre il JSON da questa response!
        return response.json();
      } else {
        // qua il server ci risponde! però non abbiamo quello che cercavamo,
        // perchè l'indirizzo era sbagliato, non siamo autorizzati a vedere i concerti etc.
        throw new Error(
          "Si è verificato un errore nella chiamata, response non OK!"
        );
      }
    })
    .then((arrayOfEvents) => {
      console.log("EVENTI A DB", arrayOfEvents);

      // for(let i=0; i<arrayOfEvents.length; i++){
      //     arrayOfEvents[i]
      // }

      arrayOfEvents.forEach((product) => {
        // per ogni concert dobbiamo creare una col e appenderla
        // alla row già esistente
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
        // la card è STATICA al momento, sarà uguale per tutti i concerti
        // selezioniamo la row già presente
        const productRow = document.getElementById("product-row");
        productRow.innerHTML = productRow.innerHTML + newProductCol;
        // eventsRow.innerHTML += newEventCol
      });
    })
    .catch((error) => {
      // non c'è internet, oppure il server proprio non esiste!
      console.log("ERRORE!", error);
    });
};

// const buy = function (e) {
//   console.log(e.target)
// }

getEvents();
