
// Save User Data from Page 1
function saveUserData() {
  const userData = {
    weightGoal: document.getElementById('weightGoal').value,
    bodyFatGoal: document.getElementById('bodyFatGoal').value,
    timeframe: document.getElementById('timeframe').value,
    diet: document.getElementById('diet').value,
    exerciseGoal: document.getElementById('exerciseGoal').value,
    dislikedFoods: document.getElementById('dislikedFoods').value
  };
  
  localStorage.setItem('adonisUserData', JSON.stringify(userData));
  alert('Your goals have been saved!');
}

// Reset User Setup from Page 1
function resetSetup() {
  document.getElementById('weightGoal').value = '';
  document.getElementById('bodyFatGoal').value = '';
  document.getElementById('timeframe').value = '';
  document.getElementById('diet').value = 'Keto';
  document.getElementById('exerciseGoal').value = 'Strength';
  document.getElementById('dislikedFoods').value = '';
  localStorage.removeItem('adonisUserData');
  alert('Setup has been reset!');
}

// Load User Data for Page 2, 3, 4, etc.
function loadUserData() {
  const userData = JSON.parse(localStorage.getItem('adonisUserData'));

  if (userData) {
    document.getElementById('weightGoalText').textContent = userData.weightGoal;
    document.getElementById('bodyFatGoalText').textContent = userData.bodyFatGoal;
    document.getElementById('timeframeText').textContent = userData.timeframe;
    document.getElementById('dietText').textContent = userData.diet;
    document.getElementById('exerciseFocusText').textContent = userData.exerciseGoal;
  }
}

// Next Page Navigation from Page 1 to 2
function nextPage() {
  window.location.href = '/page-2.html'; // Redirect to Page 2
}

// Save Daily Progress on Page 3
function saveProgress() {
  const progress = {
    date: document.getElementById('entryDate').value,
    weight: document.getElementById('weight').value,
    bodyFat: document.getElementById('bodyFat').value,
    mood: document.getElementById('mood').value,
    energy: document.getElementById('energy').value,
    sleep: document.getElementById('sleep').value,
    notes: document.getElementById('dailyNotes').value
  };

  // Save to Local Storage (or could save to a server)
  let logs = JSON.parse(localStorage.getItem('adonisLogs') || '[]');
  logs.push(progress);
  localStorage.setItem('adonisLogs', JSON.stringify(logs));
  alert('Progress saved!');
  renderCharts();
}

// Render the Charts for Page 3 and Page 4
function renderCharts() {
  const logs = JSON.parse(localStorage.getItem('adonisLogs') || '[]');
  const labels = logs.map(log => log.date);
  const weights = logs.map(log => +log.weight);
  const bodyFatData = logs.map(log => +log.bodyFat);
  const moods = logs.map(log => +log.mood);
  const energyLevels = logs.map(log => +log.energy);

  if (window.weightChart) window.weightChart.destroy();
  if (window.bodyFatChart) window.bodyFatChart.destroy();
  if (window.moodChart) window.moodChart.destroy();
  if (window.energyChart) window.energyChart.destroy();

  window.weightChart = new Chart(document.getElementById('weightChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Weight (kg)', data: weights, borderColor: 'blue', fill: false }]
    }
  });

  window.bodyFatChart = new Chart(document.getElementById('bodyFatChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Body Fat %', data: bodyFatData, borderColor: 'red', fill: false }]
    }
  });

  window.moodChart = new Chart(document.getElementById('moodChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Mood', data: moods, borderColor: 'green', fill: false }]
    }
  });

  window.energyChart = new Chart(document.getElementById('energyChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Energy', data: energyLevels, borderColor: 'purple', fill: false }]
    }
  });
}

// Redirect to Plan Page
function goToPlanPage() {
  window.location.href = '/page-2.html'; // Placeholder redirect to Plan Page
}

// Redirect to Progress Tracking Page
function goToTrackingPage() {
  window.location.href = '/page-3.html'; // Placeholder redirect to Progress Tracking Page
}

// Load Protocol Details for Page 5
function loadProtocolDetails() {
  const protocols = JSON.parse(localStorage.getItem('adonisProtocols') || '[]');
  const idx = document.getElementById('protocolSelect').value;
  const protocol = protocols[idx];
  document.getElementById('protocolDetails').innerHTML = `
    <p><strong>Name:</strong> ${protocol.name}</p>
    <p><strong>Start Date:</strong> ${protocol.startDate}</p>
    <p><strong>Duration:</strong> ${protocol.duration} days</p>
    <p><strong>Phase:</strong> ${protocol.phase}</p>
  `;
}

// Save New Protocol in Page 5
function createProtocol() {
  const protocol = {
    name: document.getElementById('protocolName').value,
    startDate: document.getElementById('protocolStartDate').value,
    duration: parseInt(document.getElementById('protocolDuration').value),
    phase: document.getElementById('protocolPhase').value
  };
  let protocols = JSON.parse(localStorage.getItem('adonisProtocols') || '[]');
  protocols.push(protocol);
  localStorage.setItem('adonisProtocols', JSON.stringify(protocols));
  alert('Protocol saved!');
  populateProtocols();
}

// Populate Protocols List in Page 5
function populateProtocols() {
  const protocols = JSON.parse(localStorage.getItem('adonisProtocols') || '[]');
  const select = document.getElementById('protocolSelect');
  select.innerHTML = '<option disabled selected>Select a protocol...</option>';
  protocols.forEach((protocol, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${protocol.name} (${protocol.startDate}) - ${protocol.phase}`;
    select.appendChild(option);
  });
}

// Initialize Protocols List on Page 5 Load
populateProtocols();
