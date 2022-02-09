window.onload = () => {
  prevButton.style.visibility = "hidden";
  nextButton.style.visibility = "hidden";
  nextBtnTwo.style.visibility = "hidden";
  prevBtnTwo.style.visibility = "hidden";
};
let imageVader = document.getElementById("vader");
imageVader.addEventListener("click", () => {
  nextButton.style.visibility = "visible";
});
let spaceship = document.getElementById("spaceship");
let nextButton = document.getElementById("nextBtn");
let nextBtnTwo = document.getElementById("nextBtnTwo");
let prevButton = document.getElementById("prevBtn");
let myTable = document.getElementById("myTable");
let prevBtnTwo = document.getElementById("prevBtnTwo");

let storageData = {
  url: "https://swapi.dev/api/people/",
  urlSpaceship: "https://swapi.dev/api/starships/",
  characters: [],
  next: [],
  previous: [],
};

let returnData = (url) => {
  return fetch(url)
    .then((value) => value.json())
    .then((value) => value);
};

let storeDataCharacters = (value) => {
  storageData.characters = value.results;
  storageData.next = value.next;
  storageData.previous = value.previous;
  console.log(storageData);
};

let showData = (data) => {
  let allowed = [
    data[0].name,
    data[0].height,
    data[0].mass,
    data[0].birth_year,
    data[0].gender,
    data[0].films,
  ];
  console.log(data[0]);
  let titles = Object.keys(data[0]).filter((key) => {
    for (let i = 0; i < allowed.length; i++) {
      if (data[0][key] == allowed[i]) {
        return key;
      }
    }
  });
  console.log(titles);

  let tHead = document.createElement("thead");
  let tBody = document.createElement("tbody");
  let newRow = document.createElement("tr");
  for (let title of titles) {
    let th = document.createElement("th");
    th.innerHTML = title;
    newRow.appendChild(th);
  }

  for (let value of data) {
    myTable.innerHTML = "";
    let secondRow = myTable.insertRow(myTable.length);
    secondRow.insertCell(0).innerHTML = value.name;
    secondRow.insertCell(1).innerHTML = value.height;
    secondRow.insertCell(2).innerHTML = value.mass;
    secondRow.insertCell(3).innerHTML = value.birth_year;
    secondRow.insertCell(4).innerHTML = value.gender;
    secondRow.insertCell(5).innerHTML = value.films.length;
    tBody.appendChild(secondRow);
  }

  tHead.appendChild(newRow);
  myTable.appendChild(tHead);
  myTable.appendChild(tBody);
};

let showDataSpaceships = (data) => {
  let spaceshipTitles = Object.keys(data[0]).filter((key) => {
    if (typeof data[0][key] === "string") {
      return key;
    }
  });
};

(getData = () => {
  imageVader.addEventListener("click", () => {
    returnData(storageData.url)
      .then((value) => storeDataCharacters(value))
      .then((value) => showData(storageData.characters));
  });
  spaceship.addEventListener("click", () => {
    returnData(storageData.urlSpaceship)
      .then((value) => storeDataCharacters(value))
      .then((value) => showDataSpaceships(storageData.characters));
  });
  nextButton.addEventListener("click", () => {
    returnData(storageData.next)
      .then((value) => storeDataCharacters(value))
      .then((value) => showData(storageData.characters))
      .then((prevButton.style.visibility = "visible"));
  });
  prevButton.addEventListener("click", () => {
    returnData(storageData.previous)
      .then((value) => storeDataCharacters(value))
      .then((value) => showData(storageData.characters))
      .catch(
        (value) => console.log(value),
        (nextButton.style.visibility = "hidden")
      );
  });
})();
