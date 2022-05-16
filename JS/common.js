/// Zobrazujem produkty na stranke INDEX  ako akcie ////////

function renderProdcuts() {
  let vnutro = "";

  for (let i = 0; i < 4; i++) {
    vnutro =
      vnutro +
      `
        <div class=" ramcek">
            <img  class="velkost"  onclick=" window.open('detail.html?id=${produkty[i].id} ')" src="${produkty[i].obrazok} "  ><br>
              <div class="nazov" onclick=" window.open('detail.html?id=${produkty[i].id}  ' )"> ${produkty[i].nazov}</div>     
              <div>
              <div class="cena">${produkty[i].cena} 
              <button class="kupit" onclick="pridajPolozku(${produkty[i].id})  ">Kúpiť</button>
              </div>
              </div>
       </div>
       `;
  }
  produktyEl.innerHTML = ' <div  class="zorad"> ' + vnutro + "</div>";
}

///// Zobrazujem produkty na stranke TOVAR //////////////////////////////////
function renderTovar(products = produkty) {
  let vnutro = "";

  for (let i = 0; i < products.length; i++) {
    vnutro =
      vnutro +
      `
        <div class="ramcekTovar">
            <img  class="velkost"  onclick=" window.open('detail.html?id=${products[i].id} ')" src="${products[i].obrazok}  "  ><br>
              <div class="nazovTovar" onclick=" window.open('detail.html?id=${products[i].id} ')"> ${products[i].nazov}</div>     
              <div>
              <div class="cena">${products[i].cena} 
              <button class="kupit" onclick="pridajPolozku(${products[i].id})">Kúpiť</button>
              </div>
              </div>
       </div>
       `;
  }
  tovarEl.innerHTML = ' <div  class="tovarRamcek"> ' + vnutro + "</div>";
}

//// PLNENIE KOSIKA  A TOAST PRIDAL SOM PRODUKT ////////

function pridajPolozku(id) {
  let zobrazToast = document.getElementById("toast");
  zobrazToast.className = "show";
  setTimeout(function () {
    zobrazToast.className = zobrazToast.className.replace("show", "");
  }, 2000);

  if (kosik.some((polozka) => polozka.id === id)) {
    zmenaKusov("plus", id);
  } else {
    let polozka = produkty.find((produkt) => produkt.id === id);

    kosik.push({
      ...polozka,
      numberOfUnits: 1,
    });
  }

  aktualKosik();
}

//// plnim kosik do local
function aktualKosik() {
  localStorage.setItem("kosik", JSON.stringify(kosik));
  renderkosikPolozky();
  renderSpolu();
  aktualizujPocetPoloziekKosikIkona();
}

///////////  pocitanie kus a cena
function renderSpolu() {
  if (typeof cenaTotalEl === "undefined") {
    return;
  }
  let totalCena = 0;
  let totalPolozka = getTotalPolozka();
  cenaBezDph = 0;

  kosik.forEach((polozka) => {
    totalCena += parseInt(polozka.numberOfUnits) * parseInt(polozka.cena);
    cenaBezDph = parseInt(totalCena) / 1.2;
  });

  cenaTotalEl.innerHTML = `
  <div class="totalpolozkyramik">
  <div class="totalpolozky"> Počet položiek v košíku:  ${totalPolozka} ks  </div> 
  <div class="totalpolozky"> Celková suma košíka  bez DPH: ${cenaBezDph.toFixed(
    2
  )} €</div>
 <div class="totalpolozkyDPH"> Celková suma košíka s DPH: ${totalCena} € </div>
 
  </div>
  `;
}

function getTotalPolozka() {
  let totalPolozka = 0;

  kosik.forEach((polozka) => {
    totalPolozka += polozka.numberOfUnits;
  });
  return totalPolozka;
}

function aktualizujPocetPoloziekKosikIkona() {
  document.getElementById("pocetPoloziekKosikIkona").innerHTML =
    getTotalPolozka();
}

////// zobrazenie kosika
function renderkosikPolozky() {
  if (typeof polozkyKosikEl === "undefined") {
    return;
  }
  polozkyKosikEl.innerHTML = "";

  kosik.forEach((polozka) => {
    polozkyKosikEl.innerHTML += `
   
            <div class="ramikKosik">
           
            <img  onclick=" window.open('detail.html?id=${polozka.id}  ' )" class="velkostObrazkaKosik    "src="${polozka.obrazok}" alt="${polozka.nazov}">
            
           <div class="popisKosik">
            <div  class="nazovKosik" onclick=" window.open('detail.html?id=${polozka.id}  ' )"> ${polozka.nazov} </div>
            <div  class="cenaKosik"  >  ${polozka.cena} </div>
          
            <div  class="tlacidlo kusKosik" onclick="zmenaKusov('plus',  ${polozka.id} )"> + </div>
            <div class="kusKosik"   >  ${polozka.numberOfUnits}  </div>
            <div  class="tlacidlo kusKosik" onclick="zmenaKusov('minus',  ${polozka.id} )"> - </div>
        
            <div  class="tlacidlo" onclick="odstranPolozku(${polozka.id})">odstráň  položku</div>
            </div>
            
            </div>
            </div>
            </div>
            `;
  });
}

//// odstranim polozky
function odstranPolozku(id) {
  kosik = kosik.filter((polozka) => polozka.id !== id);

  aktualKosik();
}
/////// pocitanie kusov
function zmenaKusov(action, id) {
  kosik = kosik.map((polozka) => {
    let numberOfUnits = polozka.numberOfUnits;

    if (polozka.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }
    return {
      ...polozka,
      numberOfUnits,
    };
  });

  aktualKosik();
}
///vyberam dopravu pre hotovost

function vyberDopravyHotvost() {
  let checkBox = document.getElementById("hotovost");

  if (checkBox.checked == true) {
    polozkyPlatbaEL.innerHTML = ` 
        <input  type="checkbox" id="osobny"  onclick="platbaCash()" > 
        <label  class="vyberPlatby"  for="osobny">Osobný odber:</label> `;
  }
}

///vyberam dopravu pre dobierky
function vyberDopravyDobierka() {
  let checkBox = document.getElementById("dobierka");

  if (checkBox.checked == true) {
    polozkyPlatbaEL.innerHTML = `
        <div>
        <input type="radio" id="kurier" name="prepravnePodmienky" onclick="platba()"  > 
        <label  class="vyberPlatby"  for="kurier">Kurier UPS:</label>  <br>

        <input type="radio" id="posta" name="prepravnePodmienky" onclick="platba()"> 
        <label class="vyberPlatby"  for="posta">Kurier Pošta:</label> 
        </div>
        `;
  }
}

let sprava = "";

function platba() {
  let platbaKurier = document.getElementById("kurier");
  let platbaPosta = document.getElementById("posta");

  if (platbaKurier.checked) {
    sprava = "kurier + dobierka ";
  }
  if (platbaPosta.checked) {
    sprava = "posta + dobierka ";
  }
  localStorage.setItem("sendOrder", JSON.stringify(sprava));
  sprava = localStorage.getItem("sendOrder");
}
function platbaCash() {
  let platbaHotovost = document.getElementById("osobny");
  if (platbaHotovost.checked == true) {
    sprava = "osobny odber + hotovost ";
  }
  }
  




//////// FILTER//////
function getCategoryForFilter() {
  let kategorie = [];
  for (produkt of produkty) {
    for (kategoria of produkt.kategoria) {
      kategorie.push(kategoria);

      //    console.log("toto su kategorie   " +  kategorie)
    }
  }

  kategorie = _.uniq(kategorie);

  kategorie.sort();
  // console.log("tzoradene   ", kategorie);

  return kategorie;
}

function renderTlacidla() {
  let kategorie = getCategoryForFilter();
  let select = document.getElementById("filter");

  for (let i = 0; i < kategorie.length; i++) {
    let button = document.createElement("button");
    button.classList.add("jsTlacidla");
    button.classList.add("HoverClass1");
    button.textContent = kategorie[i];
    button.onclick = () => filtruj(kategorie[i]);
    select.appendChild(button);
  }
}

let poslednaFiltrovanaKategoria = "";

function filtruj(kategoria) {
  let result = [];

  if (kategoria == "") {
    result = [...produkty];
  } else {
    result = produkty.filter((produkt) =>
      produkt.kategoria.includes(kategoria)
    );

    poslednaFiltrovanaKategoria = kategoria;
  }

  let cenaOd = document.getElementById("cenaOd").value;

  if (cenaOd) {
    result = result.filter((produkt) => parseInt(produkt.cena) >= cenaOd);
    // console.log("som v if OD ");
  }

  let cenaDo = document.getElementById("cenaDo").value;

  if (cenaDo) {
    result = result.filter((produkt) => parseInt(produkt.cena) <= cenaDo);
    // console.log("som v if DO");
  }

  let popis = document.getElementById("filterPopis").value;

  if (popis) {
    result = result.filter((produkt) =>
      produkt.popis.toUpperCase().includes(popis.toUpperCase())
    );
    // console.log("som v if DO");
  }

  let nazov = document.getElementById("filterNazov").value;

  if (nazov) {
    result = result.filter((produkt) =>
      produkt.nazov.toUpperCase().includes(nazov.toUpperCase())
    );
  }

  result.forEach((e) => {
    // console.log(e.cena);
  });
  renderTovar(result);
}

let localStorageKosik = localStorage.getItem("kosik");
// let kosik = localStorageKosik ? JSON.parse(localStorageKosik):[]

let kosik = [];
if (localStorageKosik) {
  kosik = JSON.parse(localStorageKosik);
} else {
  kosik;
}



aktualizujPocetPoloziekKosikIkona();


