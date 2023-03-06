const cardDiv = document.querySelector(".cards-div");
const input = document.querySelector(".nosubmit");
const selectBtn = document.querySelector("#select");

let data = [];

function displayContent(data) {
  cardDiv.innerHTML = "";
  data.forEach((results) => {
    const {
      name: { common },
      population,
      region,
      flags: { alt, png },
      capital,
    } = results;
    cardDiv.innerHTML += `
        <a href="./detailed.html?common=${common}" class="card">
          <div>
              <img src="${png}" alt="country photo">
              <p class="country-name">${common}</p>
              <p>Population: ${population}</p>
              <p>Region: ${region}</p>
              <p>Capital: ${capital}</p>
          </div>
        </a>
        `;
  });
}

async function countryData() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    data = await response.json();
    console.log(data);
    displayContent(data);
  } catch (error) {
    console.error(error);
  }
}

input.addEventListener("input", async () => {
  const searchQuery = input.value;
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  data = await response.json();
  const filteredCountries = data.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );
  displayContent(filteredCountries);
});



selectBtn.addEventListener("change", async () => {
  const selectQuery = selectBtn.value;                                                              
  const response = await fetch(`https://restcountries.com/v3.1/region/${selectQuery}`);
  data = await response.json();
  displayContent(data);
  
});
countryData();
