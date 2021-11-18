const nintendoTaxes = 1.43;
const xboxSteamTaxes = 1.65;

var recentSearches = []; // array to store recent calculated games

let button = document.getElementById("buttonCalculate");

button.addEventListener("click", function(){
  let selectedPlatform = document.getElementById("platform").value;
  let gameName = document.getElementById("gameName").value;
  let gamePrice = document.getElementById("value").value; // get price without taxes

  if (!(selectedPlatform === "Plataforma")){
    let result = calculateTax (gamePrice, selectedPlatform); // return the final value
    document.getElementById("displayResult").innerHTML = gameName + " costara con impuestos: " + result + " pesos."; // display result

    let actualGame = {
      platform: selectedPlatform,
      name: gameName,
      price: gamePrice,
      priceWithTaxes: result
    };
    recentSearches.unshift(actualGame); // store the game in the beggining of array
    displayArray(); // add first element of the array in the table
  }
  else {
    document.getElementById("displayResult").innerHTML = "Seleccionar plataforma"; 
  }
})

function calculateTax(gamePrice, selectedPlatform){
  if (selectedPlatform === "Nintendo") {
    return gamePrice * nintendoTaxes;
  }
  else {
    return gamePrice * xboxSteamTaxes;
  }
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

/*
let table = document.getElementById("recent");
let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");

  td1.appendChild(document.createTextNode(recentSearches[0].platform));
  td2.appendChild(document.createTextNode(recentSearches[0].name));
  td3.appendChild(document.createTextNode(recentSearches[0].price));
  td4.appendChild(document.createTextNode(recentSearches[0].priceWithTaxes));

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  table.appendChild(tr);
*/
