function login() {
  const email = document.getElementById('loginEmail').value;

  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, role: 'admin' })
  })
  .then(res => res.json())
  .then(data => {
    if (data && data.id) {
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = 'admin_dashboard.html'; // 🚀 Redirects to Dashboard
    } else {
      alert('Login failed. Admin not found.');
    }
  })
  .catch(error => {
    console.error('Login error:', error);
    alert('Error occurred during login.');
  });
}
