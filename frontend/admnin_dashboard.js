document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.name) {
    document.getElementById('welcomeText').innerText = `Welcome, ${user.name}!`;
  } else {
    document.getElementById('welcomeText').innerText = `Welcome!`;
  }
});

async function showAllEvents() {
  try {
    const res = await fetch('/api/events');
    const events = await res.json();

    const content = document.getElementById('contentArea');
    content.innerHTML = '<h2>All Events</h2>';

    events.forEach(event => {
      // Format dates
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      const createdAt = new Date(event.createdAt).toISOString().split('T')[0];

      const eventDiv = document.createElement('div');
      eventDiv.innerHTML = `
        <strong>Event Title:</strong> ${event.title} <br>
        <strong>User Name:</strong> ${event.User ? event.User.name : 'N/A'} <br>
        <strong>Event Date:</strong> ${eventDate} <br>
        <strong>Created At:</strong> ${createdAt} <br>
        <hr>
      `;
      content.appendChild(eventDiv);
    });

  } catch (err) {
    console.error('Error loading events:', err);
    alert('Failed to load events');
  }
}




// Show Create New Event Form
function showCreateEventForm() {
  const content = document.getElementById('contentArea');
  content.innerHTML = `
    <h2>Create New Event for a User</h2>
    <form id="createEventForm">
      <label>Title:</label><br>
      <input type="text" id="title" required><br>
      <label>Description:</label><br>
      <textarea id="description" required></textarea><br>
      <label>Date:</label><br>
      <input type="date" id="date" required><br>
      <button type="submit">Create Event</button>
    </form>
  `;

  document.getElementById('createEventForm').addEventListener('submit', createEvent);
}

function createEvent(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;


  const user = JSON.parse(localStorage.getItem('user'));

  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      date,
      type,
      userId: user.id   // createdBy admin
    })
  })
    .then(res => res.json())
    .then(data => {
      alert('Event created successfully!');
      showAllEvents();
    })
    .catch(err => {
      console.error('Error creating event:', err);
      alert('Failed to create event.');
    });
}
