import { fetchPopularMovies, fetchPopularSeries } from './api.js';

export async function renderMovieCarousel(containerId) {
    try {
        const movies = await fetchPopularMovies();
        const container = document.getElementById(containerId);

        movies.slice(0, 6).forEach(movie => {
            const card = document.createElement('div');
            card.className = "w-40 m-2 shrink-0 bg-white rounded-lg shadow";
            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="rounded-t-lg">
                <div class="p-2">
                    <p class="text-sm font-bold">${movie.title}</p>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erreur lors du rendu des films :', error);
    }
}

export async function renderSeriesCarousel(containerId) {
    try {
        const series = await fetchPopularSeries();
        const container = document.getElementById(containerId);

        series.slice(0, 6).forEach(serie => {
            const card = document.createElement('div');
            card.className = "w-40 m-2 shrink-0 bg-white rounded-lg shadow";
            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w300${serie.poster_path}" class="rounded-t-lg">
                <div class="p-2">
                    <p class="text-sm font-bold">${serie.name}</p>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erreur lors du rendu des séries :', error);
    }
}
