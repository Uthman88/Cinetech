const API_KEY = "fb44f61bb09329fa7623088a309d6919";  // clé APi ici
const URL_BASE = "https://api.themoviedb.org/3"; // URL de base de l'API
const URL_IMAGE = "https://image.tmdb.org/t/p/w200"; // URL de base pour les images

// Chargement au lancement
document.addEventListener("DOMContentLoaded", () => {
  chargerFilms();
  chargerSeries();
  chargerCommentaires();
});

function chargerFilms() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR`)
    .then(res => {
      if (!res.ok) throw new Error('Erreur lors du chargement des films');
      return res.json();
    })
    .then(data => {
      const conteneur = document.getElementById("carousel-films");
      conteneur.innerHTML = ""; // Réinitialiser le contenu
      data.results.slice(0, 8).forEach(film => { // Limiter à 8 films
        const div = document.createElement("div");
        div.className = "min-w-[150px] bg-white rounded-lg shadow-md";
        div.innerHTML = `
          <img src="${URL_IMAGE}${film.poster_path}" class="rounded-t-lg">
          <div class="p-2">
            <p class="text-sm font-semibold text-center">${film.title}</p>
          </div>
        `;
        conteneur.appendChild(div);
      });
    })
    .catch(error => console.error('Erreur lors du chargement des films :', error));
}

function chargerSeries() {
  fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=fr-FR`)
    .then(res => {
      if (!res.ok) throw new Error('Erreur lors du chargement des séries');
      return res.json();
    })
    .then(data => {
      const conteneur = document.getElementById("carousel-series");
      conteneur.innerHTML = ""; // Réinitialiser le contenu
      data.results.slice(0, 8).forEach(serie => { // Limiter à 8 séries
        const div = document.createElement("div");
        div.className = "min-w-[150px] bg-white rounded-lg shadow-md";
        div.innerHTML = `
          <img src="${URL_IMAGE}${serie.poster_path}" class="rounded-t-lg">
          <div class="p-2">
            <p class="text-sm font-semibold text-center">${serie.name}</p>
          </div>
        `;
        conteneur.appendChild(div);
      });
    })
    .catch(error => console.error('Erreur lors du chargement des séries :', error));
}

function chargerCommentaires() {
  const commentairesJSON = [
    { utilisateur: "Alice", contenu: "Super site !" },
    { utilisateur: "Bob", contenu: "J'adore les films proposés." }
  ];
  const conteneur = document.getElementById("commentaires");
  commentairesJSON.forEach(com => {
    const div = document.createElement("div");
    div.className = "bg-white p-2 rounded shadow";
    div.innerHTML = `<strong>${com.utilisateur} :</strong> <span>${com.contenu}</span>`;
    conteneur.appendChild(div);
  });
}

document.getElementById("recherche").addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}`)
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la recherche');
        return res.json();
      })
      .then(data => {
        const conteneur = document.getElementById("carousel-films");
        conteneur.innerHTML = ""; // Réinitialiser le contenu
        data.results.slice(0, 8).forEach(item => {
          const div = document.createElement("div");
          div.className = "min-w-[150px] bg-white rounded-lg shadow-md";
          div.innerHTML = `
            <img src="${URL_IMAGE}${item.poster_path}" class="rounded-t-lg">
            <div class="p-2">
              <p class="text-sm font-semibold text-center">${item.title || item.name}</p>
            </div>
          `;
          conteneur.appendChild(div);
        });
      })
      .catch(error => console.error('Erreur lors de la recherche :', error));
  }
});
