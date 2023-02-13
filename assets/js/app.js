//Tableau de films
let films = [
  { name: "Deadpool", years: 2016, authors: "Tim Miller" },
  { name: "Spiderman", years: 2002, authors: "Sam Raimi" },
  { name: "Scream", years: 1996, authors: "Wes Craven" },
  { name: "It: chapter 1", years: 2019, authors: "Andy Muschietti" },
];

//Affichage des films dans un tableau Bootstrap
let listFilm = document.querySelector("#liste-film");
let index = 0 ;

films.forEach(function (film) {
  let lignFilm =
    "<tr><td class='fw-bold'>" +
    film.name +
    "</td><td>" +
    film.years +
    "</td><td>" +
    film.authors +
    "</td><td><button type='button' class='btn btn-danger delete-btn data-index='" + index + "'>Supprimer</button></td></tr>";
  listFilm.innerHTML += lignFilm;
  index++;
});

// Modification de l'apparence du bouton sur mobile
window.addEventListener("resize", function () {
  let buttons = document.querySelectorAll(".delete-btn");
  if (window.innerWidth < 540) {
    buttons.forEach(function (button) {
      button.classList.remove("btn-danger");
      button.classList.add("btn-close");
      button.textContent = "";
    });
  } else {
    buttons.forEach(function (button) {
      button.classList.remove("btn-close");
      button.classList.add("btn-danger");
      button.textContent = "Supprimer";
    });
  }
});

let addFilmBtn = document.querySelector("#add-film-btn");
let addFilmForm = document.querySelector("#add-film-form");
let saveFilmBtn = document.querySelector("#save-film-btn");
let annulFilmBtn = document.querySelector("#annul-film-btn");

// Ajout d'un évenement sur le bouton ajouter
addFilmBtn.addEventListener("click", function () {
  addFilmBtn.style.display = "none";
  addFilmForm.classList.remove("d-none");
});

//Annulation de la demande d'ajout
annulFilmBtn.addEventListener("click", function () {
  addFilmBtn.style.display = "inline";
  addFilmForm.classList.add("d-none");
  addFilmForm.reset();
});

//  Fonction de validation des informations saisies
function validateFilm(title, year, author) {
  let errors = [];

  if (title.length < 2) {
    errors.push("Le titre doit comporter au moins 2 caractères.");
  }

  if (!/^\d{4}$/.test(year) || year < 1900 || year > new Date().getFullYear()) {
    errors.push("L'année doit être comprise entre 1900 et l'année en cours.");
  }

  if (author.length < 5) {
    errors.push("L'auteur doit comporter au moins 5 caractères.");
  }

  return errors;
}

//Sauvegarde de l'ajout de film
saveFilmBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let title = document.querySelector("#film-title").value;
  let year = document.querySelector("#film-year").value;
  let author = document.querySelector("#film-author").value;
  let errors = validateFilm(title, year, author);
  let alerts = document.querySelector("#alerts");
  let formAjout = document.querySelector("#formAjoutFilm");
  alerts.innerHTML = "";

  //Evenement si information saisie incorrect
  if (errors.length > 0) {
    alerts.classList.remove("d-none");
    alerts.classList.add("alert-warning");

    errors.forEach(function (error) {
      let errorItem = document.createElement("p");
      errorItem.textContent = error;
      alerts.appendChild(errorItem);
      setTimeout(function () {
        alerts.classList.add("d-none");
      }, 5000);
    });
    return;
  }

  //Evenement si information saisie correct
  alerts.classList.remove("d-none");
  alerts.classList.add("alert-success");
  formAjout.classList.add("d-none");
  alerts.innerHTML = "<p>Film ajouté avec succès</p>";

  setTimeout(function () {

    
    addFilmBtn.style.display = "inline";
    addFilmForm.classList.add("d-none");
    alerts.classList.add("d-none");
    formAjout.classList.remove("d-none");
  }, 3000);

  //Mise en forme des informations

  title = title.charAt(0).toUpperCase() + title.substring(1).toLowerCase();
  author = author.charAt(0).toUpperCase() + author.substring(1).toLowerCase();

  //Recuperation des informations  saisies
  let newFilm = {
    name: title,
    years: year,
    authors: author,
  };

  // importation des donnnées dans tableau d'objet
  films.push(newFilm);
  // importation des donnnées dans tableau HTML
  let lignFilm =
    "<tr><td class='fw-bold'>" +
    newFilm.name +
    "</td><td>" +
    newFilm.years +
    "</td><td>" +
    newFilm.authors +
    "</td><td><button type='button' class='btn btn-danger delete-btn' data-index='" + index + "'>Supprimer</button></td></tr>";
  listFilm.innerHTML += lignFilm;
  index++;
  // Réinitialisation des inputs
  addFilmForm.reset();
});

//Importation de la librairie Confetti.JS
// Pass in the id of an element
let confetti = new Confetti('demo');

// Edit given parameters
confetti.setCount(75);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(true); 

// Tri des films en fonction de l'option choisie
let select = document.querySelector("#select");
select.addEventListener("change", function () {
  let value = this.value;
  switch (value) {
    case "name-asc":
      films.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      break;
    case "name-desc":
      films.sort(function (a, b) {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
      break;
    case "years-asc":
      films.sort(function (a, b) {
        return a.years - b.years;
      });
      break;
    case "years-desc":
      films.sort(function (a, b) {
        return b.years - a.years;
      });
      break;
  }
  updateTable();
});

// Mise à jour du tableau des films
function updateTable() {
  listFilm.innerHTML = "";
  films.forEach(function (film) {
    let lignFilm =
      "<tr><td class='fw-bold'>" +
      film.name +
      "</td><td>" +
      film.years +
      "</td><td>" +
      film.authors +
      "</td><td><button type='button' class='btn btn-danger delete-btn' data-index='" + index + "'>Supprimer</button></td></tr>";
    listFilm.innerHTML += lignFilm;
    index++;
  });
}

$(document).ready(function() {
    let listFilm = $('#liste-film');
    console.log()
        
        function displayFilms() {
        listFilm.html("");
        $.each(films, function(index, film) {
        let lignFilm = "<tr><td class='fw-bold'>" + film.name + "</td><td>" + film.years + "</td><td>" + film.authors + "</td><td><button type='button' class='btn btn-danger delete-btn' data-index='" + index + "'>Supprimer</button></td></tr>";
        listFilm.append(lignFilm);
        });
        }
        
          $(document).on('click', '.delete-btn', function() {
          let index = parseInt($(this).data("index"));
          let confirmation = confirm("Voulez-vous vraiment supprimer ce film?");
          if(confirmation == true){
          films.splice(index, 1);
          displayFilms();
        }
          });
          
        
          
    });