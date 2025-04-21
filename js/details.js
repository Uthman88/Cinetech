import { getImageUrl } from './api.js';
import { isFavorite, toggleFavorite } from './favoris.js';

export function renderDetailContent(data, type) {
  const { details, credits, similar } = data;
  const detailsPage = document.getElementById('details-page');
  
  detailsPage.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="lg:w-1/3">
        <img src="${getImageUrl(details.poster_path)}" 
             alt="${details.title || details.name}"
             class="w-full rounded-lg shadow-lg">
      </div>
      
      <div class="lg:w-2/3">
        <h1 class="text-3xl font-bold mb-2">${details.title || details.name}</h1>
        
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
            ${type === 'movie' ? 'Film' : 'Série'}
          </span>
          <span>${(details.release_date || details.first_air_date)?.split('-')[0] || 'N/A'}</span>
          ${type === 'movie' && details.runtime ? `
            <span>${Math.floor(details.runtime / 60)}h ${details.runtime % 60}min</span>
          ` : ''}
          <div class="flex items-center">
            <span class="text-yellow-500 mr-1">★</span>
            <span>${details.vote_average?.toFixed(1) || 'N/A'}/10</span>
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Genres</h2>
          <div class="flex flex-wrap gap-2">
            ${details.genres?.map(genre => `
              <span class="bg-gray-200 px-3 py-1 rounded-full text-sm">${genre.name}</span>
            `).join('') || 'N/A'}
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Synopsis</h2>
          <p class="text-gray-700">${details.overview || 'Aucune description disponible.'}</p>
        </div>
        
        ${credits.cast?.length > 0 ? `
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Casting principal</h2>
          <div id="cast-container" class="flex gap-4 overflow-x-auto pb-4"></div>
        </div>
        ` : ''}
      </div>
    </div>
    
    ${similar?.length > 0 ? `
    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">Suggestions similaires</h2>
      <div id="similar-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"></div>
    </section>
    ` : ''}
    
    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">Commentaires</h2>
      <div id="comments-container" class="space-y-4 mb-6"></div>
      
      <form id="comment-form" class="bg-white p-4 rounded-lg shadow">
        <h3 class="font-semibold mb-3">Ajouter un commentaire</h3>
        
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
          <input type="text" id="comment-author" required 
                class="w-full p-2 border rounded">
        </div>
        
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Note</label>
          <div class="rating-stars" id="rating-stars">
            ${Array.from({length: 5}, (_, i) => `
              <i class="fas fa-star star" data-rating="${i + 1}"></i>
            `).join('')}
          </div>
          <input type="hidden" id="comment-rating" value="0">
        </div>
        
        <div class="mb-3">
          <label class="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
          <textarea id="comment-text" required rows="3"
                   class="w-full p-2 border rounded"></textarea>
        </div>
        
        <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Publier
        </button>
      </form>
    </section>
  `;
  
  // Bouton favori
  const favoriteBtn = document.createElement('button');
  favoriteBtn.className = 'absolute top-4 right-4 bg-purple-600 text-white p-2 rounded-full shadow-lg';
  favoriteBtn.innerHTML = isFavorite(details.id, type) ? '❤️' : '♡';
  favoriteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isNowFavorite = toggleFavorite({
      id: details.id,
      type,
      title: details.title || details.name,
      poster_path: details.poster_path
    });
    favoriteBtn.innerHTML = isNowFavorite ? '❤️' : '♡';
  });
  detailsPage.querySelector('.lg-w-1\\/3').appendChild(favoriteBtn);
  
  // Casting
  if (credits.cast?.length > 0) {
    const castContainer = document.getElementById('cast-container');
    credits.cast.slice(0, 10).forEach(person => {
      const div = document.createElement('div');
      div.className = 'flex flex-col items-center min-w-[120px]';
      div.innerHTML = `
        <img src="${getImageUrl(person.profile_path, 'w185')}" 
             class="w-16 h-16 rounded-full object-cover mb-2"
             alt="${person.name}"
             onerror="this.src='./assets/placeholder.jpg'">
        <p class="text-sm font-semibold text-center">${person.name}</p>
        <p class="text-xs text-gray-600 text-center">${person.character || ''}</p>
      `;
      castContainer.appendChild(div);
    });
  }
  
  // Suggestions similaires
  if (similar?.length > 0) {
    const similarContainer = document.getElementById('similar-container');
    similar.forEach(item => {
      if (!item.poster_path) return;
      
      const card = document.createElement('div');
      card.className = 'media-card bg-white rounded-lg shadow overflow-hidden';
      card.innerHTML = `
        <img src="${getImageUrl(item.poster_path)}" 
             class="w-full media-poster"
             alt="${item.title || item.name}">
        <div class="p-3">
          <h3 class="font-semibold truncate">${item.title || item.name}</h3>
        </div>
      `;
      
      card.addEventListener('click', () => showDetails(item.id, type));
      similarContainer.appendChild(card);
    });
  }
  
  // Charger les commentaires existants
  loadComments(details.id);
  
  // Configuration du formulaire de commentaire
  setupCommentForm(details.id, type);
  
  // Configuration des étoiles de notation
  setupRatingStars();
}

function setupRatingStars() {
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('comment-rating');
  
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating);
      ratingInput.value = rating;
      
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < rating);
      });
    });
    
    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.dataset.rating);
      
      stars.forEach((s, i) => {
        s.classList.toggle('hover', i < rating);
      });
    });
    
    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });
  });
}

function loadComments(mediaId) {
  const comments = JSON.parse(localStorage.getItem(`comments_${mediaId}`)) || [];
  const container = document.getElementById('comments-container');
  
  container.innerHTML = comments.map(comment => `
    <div class="comment-item">
      <div class="flex justify-between items-start mb-1">
        <div>
          <strong>${comment.author}</strong>
          <div class="rating-stars text-sm">
            ${Array.from({length: 5}, (_, i) => `
              <i class="fas fa-star ${i < comment.rating ? 'text-yellow-500' : 'text-gray-300'}"></i>
            `).join('')}
          </div>
        </div>
        <span class="text-xs text-gray-500">${new Date(comment.date).toLocaleDateString()}</span>
      </div>
      <p>${comment.text}</p>
    </div>
  `).join('');
}

function setupCommentForm(mediaId) {
  const form = document.getElementById('comment-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const author = document.getElementById('comment-author').value.trim();
    const rating = parseInt(document.getElementById('comment-rating').value);
    const text = document.getElementById('comment-text').value.trim();
    
    if (!author || rating === 0 || !text) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    const comment = {
      author,
      rating,
      text,
      date: new Date().toISOString()
    };
    
    // Sauvegarder le commentaire
    const comments = JSON.parse(localStorage.getItem(`comments_${mediaId}`)) || [];
    comments.unshift(comment);
    localStorage.setItem(`comments_${mediaId}`, JSON.stringify(comments));
    
    // Recharger les commentaires
    loadComments(mediaId);
    
    // Réinitialiser le formulaire
    form.reset();
    document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
    document.getElementById('comment-rating').value = '0';
  });
}