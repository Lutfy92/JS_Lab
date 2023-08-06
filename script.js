
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
      window.location.href = 'Resume.html';
    } else {
      alert('Invalid username/password.');
    }
  }
  
  function restrictBackToLogin() {
    if (!isLoggedIn()) {
      window.location.href = 'Login-Page.html';
    }
  }
  
  window.addEventListener('popstate', restrictBackToLogin);
  
  if (isLoggedIn()) {
    window.location.href = 'Resume.html';
  }
  
  const applicants = []; 
let currentApplicantIndex = 0;

function fetchApplicants() {
  fetch('applicants.json')
    .then((response) => response.json())
    .then((data) => {
      applicants.push(...data);
      showApplicantDetails(currentApplicantIndex);
    })
    .catch((error) => console.error('Error fetching applicants:', error));
}

function showApplicantDetails(index) {
  const applicant = applicants[index];
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  document.getElementById('name').innerText = applicant.name;
  document.getElementById('job').innerText = applicant.job;
  document.getElementById('email').innerText = applicant.email;
  document.getElementById('phone').innerText = applicant.phone;

  prevButton.style.display = index === 0 ? 'none' : 'block';
  nextButton.style.display = index === applicants.length - 1 ? 'none' : 'block';
}

function showNextApplicant() {
  currentApplicantIndex++;
  showApplicantDetails(currentApplicantIndex);
}

function showPreviousApplicant() {
  currentApplicantIndex--;
  showApplicantDetails(currentApplicantIndex);
}

function filterApplicants() {
  const jobFilter = document.getElementById('jobFilter').value.toLowerCase();
  const filteredApplicants = applicants.filter((applicant) => applicant.job.toLowerCase() === jobFilter);

  if (filteredApplicants.length === 0) {
    alert('Invalid search or No applications for this job');
  } else {
    currentApplicantIndex = 0;
    showApplicantDetails(currentApplicantIndex);
  }
}

fetchApplicants();
