
function storeCredentials(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }
  
  function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }
  
  function validateLogin(username, password) {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    return username === storedUsername && password === storedPassword;
  }
  
  function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (validateLogin(username, password)) {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'resume.html';
    } else {
      alert('Invalid username/password.');
    }
  }
  
  function restrictBackToLogin() {
    if (!isLoggedIn()) {
      window.location.href = 'index.html';
    }
  }
  
  window.addEventListener('popstate', restrictBackToLogin);
  
  if (isLoggedIn()) {
    window.location.href = 'resume.html';
  }
  