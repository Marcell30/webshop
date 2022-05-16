const urlParams = new URLSearchParams(window.location.search);

let produkt;

for (let i = 0; i < produkty.length; i++) {
  if (produkty[i].id == urlParams.get("id")) {
    produkt = produkty[i];
  }
}

if (produkt == undefined) {
  renderFailure();
} else {
  renderProduktDetail(produkt);
}

function renderProduktDetail(produkt) {
  document.getElementById("detailProdukt").innerHTML = ` 
 <div class="detailObrazok">
 <img  class="velkostObrazok"   src="${produkt.obrazok} "  >
 </div>
 <div class="detailPanel ">
 <div  class="detailTlacidla detailCena">  ${produkt.cena} </div>
 <div class="detailTlacidla detailNazov">  ${produkt.nazov}</div>
 <div class="detailTlacidla detailKupit"  onclick="pridajPolozku(${produkt.id})"  >  Kúpiť</div>
 </div>
 <div class="detailPopis">
 ${produkt.popis}
 </div>
 `;
}
