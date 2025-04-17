const API_KEY = "TA_CLE_API";
const URL_BASE = "https://api.themoviedb.org/3";

// Chargement au lancement
document.addEventListener("DOMContentLoaded", () => {
  chargerFilms();
  chargerSeries();
  chargerCommentaires();
});

function chargerFilms() {
  fetch(`${URL_BASE}/movie/popular?api_key=${API_KEY}&language=fr-FR`)
    .then(res => res.json())
    .then(data => {
      const conteneur = document.getElementById("carousel-films");
      data.results.slice(0, 10).forEach(film => {
        const div = document.createElement("div");
        div.className = "min-w-[150px] bg-white rounded-lg shadow-md";
        div.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${film.poster_path}" class="rounded-t-lg">
          <div class="p-2">
            <p class="text-sm font-semibold text-center">${film.title}</p>
          </div>
        `;
        conteneur.appendChild(div);
      });
    });
}

function chargerSeries() {
  fetch(`${URL_BASE}/tv/popular?api_key=${API_KEY}&language=fr-FR`)
    .then(res => res.json())
    .then(data => {
      const conteneur = document.getElementById("carousel-series");
      data.results.slice(0, 10).forEach(serie => {
        const div = document.createElement("div");
        div.className = "min-w-[150px] bg-white rounded-lg shadow-md";
        div.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${serie.poster_path}" class="rounded-t-lg">
          <div class="p-2">
            <p class="text-sm font-semibold text-center">${serie.name}</p>
          </div>
        `;
        conteneur.appendChild(div);
      });
    });
}

// JSON de commentaires fictifs
const commentairesJSON = [
  { utilisateur: "Léa", contenu: "J’ai adoré ce film, vraiment touchant !" },
  { utilisateur: "Ali", contenu: "Les acteurs sont incroyables." },
  { utilisateur: "Sofia", contenu: "Belle surprise, je recommande !" }
];

function chargerCommentaires() {
  const conteneur = document.getElementById("commentaires");
  commentairesJSON.forEach(com => {
    const div = document.createElement("div");
    div.className = "bg-white p-2 rounded shadow";
    div.innerHTML = `<strong>${com.utilisateur} :</strong> <span>${com.contenu}</span>`;
    conteneur.appendChild(div);
  });
}
