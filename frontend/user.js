function userLogin() {
  const email = document.getElementById('userLoginEmail').value;
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, role: 'user' })
  })
  .then(res => res.json())
  .then(data => {
    if (data.id) {
      localStorage.setItem('user', JSON.stringify(data));
      alert('Login successful!');
    } else {
      alert('Login failed. User not found.');
    }
  })
  .catch(err => console.error('Login Error', err));
}

function userRegister() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;

  fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  })
  .then(res => res.json())
  .then(data => {
    alert('Registration successful! Please login.');
    showLogin();
  })
  .catch(err => console.error('Register Error', err));
}

function showRegister() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('registerSection').style.display = 'block';
}

function showLogin() {
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('registerSection').style.display = 'none';
}
