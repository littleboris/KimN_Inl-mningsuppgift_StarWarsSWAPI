const filmsUrl = "https://swapi.dev/api/films/";
const actorsUrl = "https://swapi.dev/api/people/";

async function moviesInfo() {
  const container = document.getElementById("container");
  // the container for the modal
  const modal = document.getElementById("modal");
  // modal-content
  const modalContent = document.getElementById("modal-content");

  // click to close
  modal.onclick = function () {
    modal.style.display = "none";
  };

  const filmsData = await fetch(filmsUrl);
  const films = await filmsData.json();

  const ActorData = await fetch(actorsUrl);
  const actors = await ActorData.json();

  const movies = films.results.map((film) => {
    //Looping through actors array
    const filmActors = actors.results
      .map((actor) => {
        //I check if item is equal to film.url
        if (actor.films.find((item) => item === film.url)) {
          return actor.name;
        }
      })
      // Filter function with Boolean wich removes all undefined
      .filter(Boolean)
      // I sort my items after alphabetic order.
      .sort();
    const movie = {
      title: film.title,
      release_date: film.release_date,
      actors: filmActors,
    };
    return movie;
  });
  console.log(movies);
  // Here in this "for of" function i go through movie array and pick the following arrays items.. For each title i create a div inside "container" element.
  for (const movie of movies) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("modal-box");
    movieCard.onclick = function () {
      modal.style.display = "block";
      modalContent.innerHTML = "";
      modalContent.innerHTML += `
    <h1>${movie.title} ${movie.release_date}</h1>
    ${movie.actors.map((actor) => `<p>${actor}</p>`).join("")}
    </div>`;
    };

    const title = document.createElement("p");
    title.classList.add("title-text");
    title.innerText = movie.title;
    movieCard.appendChild(title);

    const releseDate = document.createElement("p");
    releseDate.classList.add("release-text");
    releseDate.innerText = movie.release_date;
    movieCard.appendChild(releseDate);

    container.appendChild(movieCard);
  }
}
// This is just for fun, i added a music player from a tutorial
moviesInfo();

const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title-song");
const cover = document.querySelector("#cover");

// Song titles array
const songs = ["starwarsthemeflute", "starwarsthememain"];
//Keep track of songs
let songIndex = 0;
// Initially load song into DOM
loadSong(songs[songIndex]);
// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./image/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song events

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

/*const apiFilms = "https://swapi.dev/api/films/";
const apiPeople = "https://swapi.dev/api/people/";

// Jag skapar en async function som hämtar data från API.
async function moviesInfo() {
  const data = await fetch(apiFilms);
  const jsonMovie = await data.json();

  const people = await fetch(apiPeople);
  const jsonPeople = await people.json();

  //console.log(jsonPeople);
  // Jag skapar en map och loopar igenom den, där x är = item i array.
  // Sedan använder jag mig av x(item).title och .release_date och plockar ut det jag vill ha
  const theMovies = jsonMovie.results.map((moviesItem) => {
    const movie = {
      title: moviesItem.title,
      release_date: moviesItem.release_date,
    };
    return movie;
  });
  console.log(theMovies);
  const thePeople = jsonPeople.results.map((peopleItem) => {
    const people = { name: peopleItem.name, films: peopleItem.films };
    return people;
  });
  const container = document.getElementsByClassName("modal-container");
  for (let i = 0; theMovies.length; i++) {
    container.innerHTML += `<div>
      <p>
        ${theMovies[i].title}
      </p>
    </div>`;
    console.log(container);
  }
  console.log(thePeople);
}*/

/*const cars = [
  { type: "Fiat", model: "500", color: "white" },
  { type: "Bugati", model: "6969", color: "aqua" },
  { type: "mazda", model: "420", color: "jet black" },
  { type: "idk", model: "39", color: "jet black" },
  { type: "lambo", model: "9999", color: "jet black" },
  { type: "1:one", model: "69", color: "jet black" },
  { type: "regera", model: "360", color: "jet black" },
];
for (const car of cars) {
  if (car.model % 2 === 0) {
    console.log(car);
  }
}*/

//old array

/*films.results.forEach((film) => {
  container.innerHTML += `
    <div class="modal-box" onclick="modalBox()">
      <p class="title-text">
        ${film.title}
      </p>
      <p class="release-text">
      ${film.release_date}
      </p>
    </div>`;
});*/

// When the user clicks on <span> (x), close the modal
