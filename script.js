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
}

/******************************cards generation***************************** */

var idCommonArray = [];
var idSecretArray = [];

for (let i = 0; i < diff * diff; i++) {
  idCommonArray[i] = i + 1;
}
idSecretArray[0] = idCommonArray[diff * diff - 1] + 1;
for (let i = 1; i < diff * diff; i++) {
  idSecretArray[i] = idSecretArray[i - 1] + 1;
}

for (let i = 0; i < diff * diff; i++) {
  generateCards(cardsArray[i], idCommonArray[i], idSecretArray[i]);
}

function generateCards(cardNumber, idFirstValue, idSecondValue) {
  game = document.getElementById("gameField");
  game.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
  <div class="common__side" " onclick="compareCards(` +
      idFirstValue +
      `)" id="` +
      idFirstValue +
      `"></div>
  <div class="secret__side" id="` +
      idSecondValue +
      `">` +
      cardNumber +
      `</div>`
  );
}

/**                    opening and comparing cards            */
var cardsCorrectOpened = 0;
var firstCardOpened = false;
var secondCardOpened = false;
var firstCardValue;
var secondCardValue;
var firstCardId;
var secondCardId;

function openCard(commonSide) {
  let secretSideOpen = commonSide + diff * diff;
  document.getElementById(commonSide).style.display = "none";
  document.getElementById(secretSideOpen).style.display = "flex";
}

function compareCards(cardValue) {
  let secretSideCardValue = cardValue + diff * diff;
  if (firstCardOpened == true) {
    secondCardOpened = true;
    secondCardId = cardValue;
    openCard(cardValue);
    secondCardValue = document.getElementById(secretSideCardValue).textContent;

    if (firstCardValue == secondCardValue) {
      firstCardOpened = false;
      secondCardOpened = false;
      cardsCorrectOpened++;
      if (cardsCorrectOpened == (diff * diff) / 2) {
        alert("Congratulations!!! You perfectly finish the game!!!");
        setTimeout((window.location.href = "index.html"), 3000);
      }
    } else {
      firstCardOpened = false;
      secondCardOpened = false;
      setTimeout(closeCards, 300);
    }
  } else {
    firstCardOpened = true;
    firstCardValue = document.getElementById(secretSideCardValue).textContent;
    firstCardId = cardValue;
    openCard(cardValue);
  }
}

function closeCards() {
  let secretCardCloseFirst = firstCardId + diff * diff;
  let secretCardCloseSecond = secondCardId + diff * diff;
  document.getElementById(firstCardId).style.display = "flex";
  document.getElementById(secretCardCloseFirst).style.display = "none";
  document.getElementById(secondCardId).style.display = "flex";
  document.getElementById(secretCardCloseSecond).style.display = "none";
  firstCardId = null;
  secondCardId = null;
}
