// TMDB - Ne pas oublier - Clé API à ajouter ici
const API_KEY = ''; // À remplacer par la vraie clé
const URL_BASE = 'https://api.themoviedb.org/3';

document.addEventListener("DOMContentLoaded", () => {
  chargerFilmsPopulaires();
  chargerSeriesPopulaires();
});

// Fonction pour charger les films populaires
function chargerFilmsPopulaires() {
  fetch(`${URL_BASE}/movie/popular?api_key=${API_KEY}&language=fr-FR`)
    .then(response => response.json())
    .then(data => {
      const conteneur = document.getElementById("films-container");
      data.results.slice(0, 5).forEach(film => {
        const div = document.createElement("div");
        div.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${film.poster_path}" alt="${film.title}">
          <p>${film.title}</p>
        `;
        conteneur.appendChild(div);
      });
    });
}

// Fonction pour charger les séries populaires
function chargerSeriesPopulaires() {
  fetch(`${URL_BASE}/tv/popular?api_key=${API_KEY}&language=fr-FR`)
    .then(response => response.json())
    .then(data => {
      const conteneur = document.getElementById("series-container");
      data.results.slice(0, 5).forEach(serie => {
        const div = document.createElement("div");
        div.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${serie.poster_path}" alt="${serie.name}">
          <p>${serie.name}</p>
        `;
        conteneur.appendChild(div);
      });
    });
}
