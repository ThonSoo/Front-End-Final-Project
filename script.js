const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const totalCasesElement = document.getElementById('totalCases');
const totalDeathsElement = document.getElementById('totalDeaths');
const totalRecoveredElement = document.getElementById('totalRecovered');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    return;
  }

  fetchData(searchTerm);
});

function fetchData(location) {
  const url = `https://disease.sh/v3/covid-19/countries/${location}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayData(location, data);
    })
    .catch(error => {
      console.log(error);
      displayError();
    });
}

function displayData(location, data) {
  locationElement.textContent = `COVID-19 Statistics for ${location}`;
  totalCasesElement.textContent = data.cases.toLocaleString();
  totalDeathsElement.textContent = data.deaths.toLocaleString();
  totalRecoveredElement.textContent = data.recovered.toLocaleString();
}

function displayError() {
  locationElement.textContent = 'Location not found.';
  totalCasesElement.textContent = '';
  totalDeathsElement.textContent = '';
  totalRecoveredElement.textContent = '';
}
