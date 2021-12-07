const nintendoTaxes = 1.43;
const xboxSteamTaxes = 1.65;
const usdTaxes = 1.65;
const usdApiUrl = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

var recentSearches = []; // array to store recent calculated games

async function getUsdApiData(){
  const response = await fetch(usdApiUrl);
  var usdObject = await response.json();
  return usdObject;
}

function displayArray(){
  let table = document.getElementById("recent");
  var tr = table.insertRow(0);
  
  let td1 = tr.insertCell(0);
  let td2 = tr.insertCell(1);
  let td3 = tr.insertCell(2);
  let td4 = tr.insertCell(3);

  td1.innerHTML = recentSearches[0].platform;
  td2.innerHTML = recentSearches[0].name;
  td3.innerHTML = recentSearches[0].price;
  td4.innerHTML = recentSearches[0].priceWithTaxes;
}

function createObjectGame (selectedPlatform, gameName, gamePrice, result) {
  let actualGame = {
    platform: selectedPlatform,
    name: gameName,
    price: gamePrice,
    priceWithTaxes: result
  };
  recentSearches.unshift(actualGame);
}

let button = document.getElementById("buttonCalculate");
button.addEventListener("click", function(){
  let selectedPlatform = document.getElementById("platform").value;
  let gameName = document.getElementById("gameName").value;
  let gamePrice = document.getElementById("value").value; // get price without taxes
  let selectedCurrency = document.getElementById("currency").value;
  let resultSection = document.getElementById("displayResult");
  let result = 0;

  if (selectedPlatform === "Seleccione plataforma"){
    resultSection.innerHTML = "Seleccionar plataforma";
    return;
  }
  if ((gamePrice < 0) || (gamePrice > 200000)){
    resultSection.innerHTML = "Ingrese un precio valido";
    return
  }
  if ((selectedCurrency === "Seleccione moneda")){
    resultSection.innerHTML = "Seleccione moneda";
    return
  }
  
  if (selectedCurrency === "Pesos"){
    if (!(selectedPlatform === "PlayStation")){
      selectedPlatform === "Nintendo" ? result = (gamePrice * nintendoTaxes).toFixed(2) : result = (gamePrice * xboxSteamTaxes).toFixed(2)
      createObjectGame (selectedPlatform, gameName, gamePrice, result);
      resultSection.innerHTML = gameName + " costara con impuestos: " + result + " pesos."; // display result
      displayArray(); // display the first element of the array in the table
    }
    else {
      resultSection.innerHTML = "PlayStation no tiene tienda en pesos, seleccione USD";
    }
  }
  else { // USD is selected
    getUsdApiData().then(data => {
      result = ((gamePrice * parseFloat(data[0].casa.venta)) * usdTaxes).toFixed(2); // (gameprice * dolar oficial) * usd taxes
      createObjectGame (selectedPlatform, gameName, gamePrice, result);
      resultSection.innerHTML = gameName + " costara con impuestos: " + result + " pesos.";
      displayArray();
    });
  }
})