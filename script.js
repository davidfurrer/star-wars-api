// async function predict_age() {
//   let name = document.getElementById("textbox").value;
//   let response = await fetch(`https://api.agify.io/?name=${name}`);
//   let data = await response.json();
//   console.log(data["age"]);
//   document.getElementById("response").innerHTML = data["age"];
// }

// After you have the list of the movies you should be able to click
// on the movie title and get the details about the movie or
// at once show a list of the spaceships,
// For example the description of the episode which will be shown
// in another column, you can put this in another div element.
const url = "https://swapi.dev/api/films/";

const movieList = document.getElementById("moviesList");
const description = document.getElementById("description");
const titleDescription = document.querySelector("h2");
const spaceshipListDiv = document.getElementById("spaceshipListDiv");
const spaceshipDescription = document.getElementById("spaceshipDescription");
const pilotsListDiv = document.getElementById("pilotsListDiv");
const pilotsTitle = document.getElementById("pilotsTitle");
const favPilots = document.getElementById("favPilots");

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const movies = data["results"];
    movies.forEach((movie) => {
      const li = document.createElement("li");
      li.innerHTML = movie.title;
      movieList.appendChild(li);
      // console.log(movie);

      li.addEventListener("click", () => {
        titleDescription.innerHTML = movie.title;
        description.innerHTML = movie.opening_crawl;

        const spaceshipList = document.createElement("ul");

        movie["starships"].forEach((starship) => {
          const liStarship = document.createElement("li");
          fetch(starship)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              liStarship.innerHTML = data["name"];
              spaceshipList.appendChild(liStarship);
            });

          // liStarship.innerHTML = starship;
          liStarship.addEventListener("click", () => {
            pilotsListDiv.innerHTML = "";
            fetch(starship)
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                pilotsTitle.innerHTML = "Pilots";
                spaceshipDescription.innerHTML = "Model: " + data["model"];
                data["pilots"].forEach((pilot) => {
                  const pilotLi = document.createElement("li");

                  fetch(pilot)
                    .then((res) => res.json())
                    .then((data) => {
                      pilotLi.innerHTML = data["name"];
                      pilotsListDiv.appendChild(pilotLi);
                      pilotLi.addEventListener("click", () => {
                        const favPilotLi = document.createElement("li");
                        favPilotLi.innerHTML = data["name"];
                        favPilots.appendChild(favPilotLi);
                      });
                    });
                });
              });
          });
        });
        spaceshipListDiv.innerHTML = "";
        const spaceshiptTitle = document.createElement("h2");
        spaceshiptTitle.innerHTML = "Starships";
        spaceshipListDiv.appendChild(spaceshiptTitle);
        spaceshipListDiv.appendChild(spaceshipList);
      });
    });
  });
