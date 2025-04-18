const API_KEY = 'fb44f61bb09329fa7623088a309d6919'; // Clé API
const BASE_URL = 'https://api.themoviedb.org/3'; // URL de base

export async function fetchPopularMovies() {
    try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
        if (!res.ok) throw new Error('Erreur lors de la récupération des films populaires');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Erreur fetchPopularMovies:', error);
        return [];
    }
}

export async function fetchPopularSeries() {
    try {
        const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=fr-FR`);
        if (!res.ok) throw new Error('Erreur lors de la récupération des séries populaires');
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error('Erreur fetchPopularSeries:', error);
        return [];
    }
}
