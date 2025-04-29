// Get the user from localStorage (who is logged in)
const user = JSON.parse(localStorage.getItem('user'));

// Display welcome name
document.getElementById('welcomeText').innerText = `Welcome, ${user.name}!`;

// Show Create New Event form
function createNewEvent() {
  document.getElementById('content').innerHTML = `
    <h2>Create New Event</h2>
    <input id="eventTitle" placeholder="Event Title"><br><br>
    <textarea id="eventDescription" placeholder="Description"></textarea><br><br>
    <input id="eventDate" type="date"><br><br>
    <button onclick="submitNewEvent()">Create Event</button>
  `;
}

// Handle Create Event button click
function submitNewEvent() {
  const title = document.getElementById('eventTitle').value;
  const description = document.getElementById('eventDescription').value;
  const date = document.getElementById('eventDate').value;

  if (!title || !description || !date) {
    alert('Please fill all fields!');
    return;
  }

  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      date,
      userId: user.id,  // Important to connect event to the user
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        alert('Event created successfully!');
        loadMyEvents();
      } else {
        alert('Failed to create event.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Server error');
    });
}

// Load events for the logged-in user
function loadMyEvents() {
  fetch('/api/events')
    .then(res => res.json())
    .then(events => {
      const myEvents = events.filter(event => event.userId === user.id);
      let html = '<h2>My Events</h2>';
      myEvents.forEach(event => {
        html += `
          <div>
            <strong>Title:</strong> ${event.title}<br>
            <strong>Description:</strong> ${event.description}<br>
            <strong>Date:</strong> ${event.date}<br><br>
          </div>
        `;
      });
      document.getElementById('content').innerHTML = html;
    })
    .catch(err => console.error('Error:', err));
}

// Initially load user's events when page opens
loadMyEvents();
