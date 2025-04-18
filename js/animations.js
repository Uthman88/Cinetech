importScripts('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js');
//     div.innerHTML = `
//       <strong>${com.utilisateur}</strong>
//       <p>${com.contenu}</p>
//     `;
const style = document.createElement('style');
style.textContent = `
  div {
    transition: all 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);
  