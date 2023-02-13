//Validation du formulaire de recherche - Appel de l'API OMDb
document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let title = document.getElementById("title").value;
    let titleinp = document.getElementById("title");
    let year = document.getElementById("year").value;
    let type = document.getElementById("type").value;
    let apiKey = "586fc924";
    let index = 1;
  console.log(titleinp)




    $("input").val("");

    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://www.omdbapi.com/?s=" 
        + title +
        "&y="
        + year +
        "&type=" 
        + type +
        "&page="
        + index +
        "&apikey=" 
        + apiKey, true
    );
    console.log(xhr);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.Response === "True") {
          const results = response.Search;
          const nbResult = parseInt(response.totalResults);
          const nbPage = Math.ceil(nbResult / 10);
          console.log(nbPage);
          console.log(index);

         //Affichage du nombre de resultats
         let nbResultAffichage = document.querySelector('#nbResult');
         nbResultAffichage.innerHTML = "<p class='text-center text-secondary'><span class='fw-bold'> " + nbResult + " </span>résultat(s) correspondent à votre recherche.(s)</p><p class='fs-6 fw-lighter'>Page <span class='fw-bold'>"+ index +"</span> sur "+ nbPage +"."


         // Effacement des resultats précédents
          $("#results").empty().append(resultHTML);

          for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let poster =
              result.Poster === "N/A"
                ? "assets/img/default-poster.jpg"
                : result.Poster;
            const name = result.Title;
            const annee = result.Year;
            const cat = result.Type;
            const idFilm = result.imdbID;

            var resultHTML =
              "<div id='cart-film' class='card m-3 p-3 bg-dark justify-content-center' style='max-width: 540px;'><div class='row g-0'><div class=' text-center col-md-3'>";
            resultHTML +=
              "<img src='" +
              poster +
              "' class='img-fluid m-auto rounded-start' alt='" +
              name +
              "poster'></div><div class='col-md-8'><div class='card-body'>";
            resultHTML +=
              "<h5 class='card-title fw-bolder text-white-50'>" +
              name +
              "</h5>";
            resultHTML +=
              "<p class='card-text text-secondary'>" +
              cat +
              " (" +
              annee +
              ")</p>";
            resultHTML +=
              "<p class='card-text text-secondary pb-3'>Reference Produit : " + idFilm + "</p>";
              resultHTML +=
              "<button class='btn btn-secondary btn-location m-3'><a href='https://vod.canalplus.com/' class='link-light' target='_blank'>Location disponible dès <span class='fw-bold'>0.99&euro;</span></a></button>";  
            resultHTML += "</div></div></div></div>";
                        
            //Generation des resultats
            $("#results").append(resultHTML);
          }
          

          //Affichage de la pagination si besoin
          let blockPagination = document.querySelector("#pagination");
          let btnsPage = document.querySelector("#page-num");
          if (nbPage > 1) {
            blockPagination.classList.remove("d-none");
            btnsPage.innerHTML = "";
            
            for (let i = 1; i <= nbPage; i++) {
              // afficher seulement les boutons des pages actuelle et 2 précédentes et 2 suivantes
              if (Math.abs(index - (i )) <= 2) {
                const button = document.createElement("button");
                if(i == index){
                  button.classList.add("btn", "btn-outline-secondary", "active");
                button.setAttribute("data-index", i );
                button.innerText = i ;
                btnsPage.appendChild(button);
                } 
                button.classList.add("btn", "btn-outline-secondary",);
                button.setAttribute("data-index", i );
                button.innerText = i;
                btnsPage.appendChild(button);
              }
            }
         }

         
        

            const buttons = document.querySelectorAll("button[data-index]");
            console.log(buttons);

            buttons.forEach((button) => {
               button.addEventListener("click", (event) => {
                  buttons.forEach((b) => b.classList.remove("active"));
                  index = parseInt(event.target.getAttribute("data-index"));
                const newUrl =
                  "http://www.omdbapi.com/?s=" +
                  title +
                  "&y=" +
                  year +
                  "&type=" +
                  type +
                  "&page=" +
                  index +
                  "&apikey=" +
                  apiKey;
                console.log(newUrl);
                window.scrollTo(0, 0);
                xhr.open("GET", newUrl);
                xhr.send();
              });
            });
          
        }else{
          alert('Aucun résultat ! Veuillez affinez votre recherche')
        }
        
      } else {
        alert('Nous ne parvenons pas à communiquer avec les données ')
      }
    };

    xhr.send();
  });

//Librairie confetti sur bouton de location
let confetti = new Confetti('demo2');

// Edit given parameters
confetti.setCount(75);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(false);

