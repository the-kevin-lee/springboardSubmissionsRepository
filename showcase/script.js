
function startGame() {
  const gameContainer = document.getElementById("game");

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }

  createDivsForColors(shuffledColors);

  let firstCard = null;
  let secondCard = null;
  let ableToClick = true;
  let winsCounter = 0;
  let guesses = 0;

  function handleDoneButtonClick(event) {
    alert("You won!");
    location.reload();
    let lowestGuess = localStorage.getItem("lowestGuess");
    if (!lowestGuess || guesses < lowestGuess) {
      localStorage.setItem("lowestGuess", guesses);
    }
  }

  function handleCardClick(event) {
    if (!ableToClick) return;
    const clickedCard = event.target;

    // prevents the same card from being clicked twice
    if (clickedCard === firstCard || clickedCard === secondCard) return;

    clickedCard.style.backgroundColor = clickedCard.classList[0];

    if (!firstCard) {
      firstCard = clickedCard;
    } else if (!secondCard) {
      secondCard = clickedCard;
      guesses++;
      document.getElementById("guesses").innerText = guesses;
      ableToClick = false;
      if (firstCard.style.backgroundColor === secondCard.style.backgroundColor) {
        winsCounter++;
        if (winsCounter === 5) {
          let doneButton = document.createElement("button");
          doneButton.innerText = "Done";
          document.body.appendChild(doneButton);
          doneButton.classList.add("done-button");
          if (doneButton) {
            doneButton.addEventListener("click", handleDoneButtonClick);
          }
          return;
        }
        setTimeout(() => {
          firstCard = null;
          secondCard = null;
          ableToClick = true;
        }, 1000);
      } else {
        setTimeout(() => {
          firstCard.style.backgroundColor = "";
          secondCard.style.backgroundColor = "";
          firstCard = null;
          secondCard = null;
          ableToClick = true;
        }, 1000);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.createElement("button");
  startButton.innerText = "Start Game";
  startButton.classList.add("start-button");
  document.body.prepend(startButton);
  startButton.addEventListener("click", startGame);
});
