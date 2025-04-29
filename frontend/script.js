const API_URL = 'http://localhost:8000/api/events'; // backend URL

// Create Event
document.getElementById('eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;
  const createdBy = document.getElementById('createdBy').value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, date, location, description, createdBy })
    });

    if (response.ok) {
      alert('Event created successfully!');
      document.getElementById('eventForm').reset();
      loadEvents();
    } else {
      alert('Failed to create event.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Load Events
async function loadEvents() {
  try {
    const response = await fetch(API_URL);
    const events = await response.json();

    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    events.forEach(event => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${event.title}</strong> (${new Date(event.date).toLocaleDateString()})<br>
        Location: ${event.location}<br>
        Created By: ${event.createdBy}<br>
        Description: ${event.description}
      `;
      eventsList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching events:', error);
  }
}

// Load events on page load
loadEvents();
