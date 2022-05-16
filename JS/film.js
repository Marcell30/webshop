let indexPole = 0;
zobraz();
function zobraz() {
  let film = document.getElementsByClassName("filmMenu");
  for (let i = 0; i < film.length; i++) {
    film[i].style.display = "none";
  }

  indexPole++;
  if (indexPole > film.length) {
    indexPole = 1;
  }
  film[indexPole - 1].style.display = "block";
  setTimeout(zobraz, 4000);
}
