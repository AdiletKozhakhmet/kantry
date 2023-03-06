document.addEventListener("DOMContentLoaded",()=>{ 
    let currentUrlStr = window.location.href; 
    let currentUrl = new URL(currentUrlStr); 
    let common = currentUrl.searchParams.get("common");
    const countryDetails = document.querySelector('.country-details')

function displayContent(data) {
  console.log(data)
  const {name, nativeName, population, region, subregion, capital, currencies, languages, flags:{png,svg}, topLevelDomain} = data[0];
  const {code, name: currencyName} = currencies[0];
  const {name: languageName} = languages[0];
  countryDetails.innerHTML = '';
  countryDetails.innerHTML = `
    <button class="shutton">
        <div class="button-div" onclick="history.back()">
          <img src="./iconpng.jpg"/>
          <p>back</p>
        </div>
    </button>
    <div class="main-section">
        <div class="image">
            <img src="${svg}" alt="flag"/>
        </div>
        <div class="main-information">
            <div class="hone">
              <h1>${name}</h1
            </div>
            <div class="rightleft">
              <div class="left">
                <p>Native Name: ${nativeName}</p>
                <p>Population: ${population}</p>
                <p>Region: ${region}</p>
                <p>Sub Region: ${subregion}</p>
                <p>Capital: ${capital}</p>
              </div>
              <div class="right">
                <p>Top Level Domain: ${topLevelDomain}</p>
                <p>Currencies: ${currencyName}</p>
                <p>Languages: ${languageName}</p>
              </div>
            </div>
            <div class="border-countries">
              <p>Border Countries:</p>
            </div>
        </div>
    </div>
    `
  };


async function countryData() {
    try {
      const response = await fetch(`https://restcountries.com/v2/name/${common}`);
      data = await response.json();
      console.log(data)
      displayContent(data);
    } catch (error) {
      console.error(error);
    }
  }

  countryData()

})
