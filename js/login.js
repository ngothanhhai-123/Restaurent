import { renderNavbar } from '../components/index.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/pages/index.html';
    });
  }
});
