var diff = 4;

function changeDifficultyOn4() {
  diff = 4;
}
function changeDifficultyOn6() {
  diff = 6;
}
function changeDifficultyOn8() {
  diff = 8;
}

function startGame() {
  var playerName = document.getElementById("userName").value;

  console.log(playerName);
  // console.log(typeof playerName); checking type of variable - string
  if (playerName == "" || playerName[0] == " ") {
    alert("Input name starts with a-z letter");
  } else {
    if (diff != 0) {
      window.location.href = "game.html";
    } else {
      alert("choose difficulty");
    }
  }
}

/**                                        random array generation                    */

var coupleArray = [];
var indexArray = [];
var randomIndexArray = [];
var cardsArray = [];

var coupleIndex = 0;

for (let i = 0; i < diff * diff; i += 2) {
  coupleArray[i] = coupleIndex + 1;
  coupleArray[i + 1] = coupleIndex + 1;
  coupleIndex++;
}

for (let i = 0; i < diff * diff; i++) {
  indexArray[i] = i + 1;
}

for (let i = 0; i < diff * diff; i++) {
  let rand = indexArray[Math.floor(Math.random() * indexArray.length)];
  let randIndex;

  for (let e = 0; e < indexArray.length; e++) {
    if (indexArray[e] == rand) {
      randIndex = e;
    }
  }
  cardsArray[i] = coupleArray[rand - 1];
  indexArray.splice(randIndex, 1);
  console.log(cardsArray[i]);
}

/******************************cards generation***************************** */

for (let i = 0; i < diff * diff; i++) {
  generateCards(cardsArray[i]);
}

function generateCards(cardNumber) {
  game = document.getElementById("gameField");
  game.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
  <div class="common__side"><script>cardNumber</script></div>
  <div class="secret__side"></div>
</div>`
  );
}
