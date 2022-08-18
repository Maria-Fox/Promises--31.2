let baseURL = "https://numbersapi.com";
num = 8;
favNumber = 10;

// 1.
// without JSON & axios- comes w/ headers & more info
function numberFact() {
  axios.get(`${baseURL}/${num}`).then((resp) => console.log(resp));
}

// w. JSON & jquery get, comes w/ written in object details
$.getJSON(`${baseURL}/${favNumber}?json`).then((data) => {
  // console.log(data);
});

// 2.
// randomGenerator = Math.floor(Math.random() * 51);

requests = [];
for (let i = 0; i < 5; i++) {
  requests.push(`${baseURL}/${i}?json`);
  $.getJSON(requests[i]).then((response) =>
    $("#facts").append(`<li>${response.text}</li>`)
  );
}

// 3.

favRequests = [8, 8, 8, 8];

for (let i = 0; i <= favRequests.length; i++) {
  $.getJSON(`${baseURL}/${favRequests[i]}?json`).then((response) =>
    $("#fav-facts").append(`<li>${response.text}</li>`)
  );
}

// this returns a get array w/ length of 4 from fav number
// Promise.all(
//   Array.from({ length: 4 }, () => {
//     return $.getJSON(`${baseURL}/${favNumber}?json`);
//   })
// ).then((facts) => {
//   facts.forEach((data) => $("body").append(`<p>${data.text}</p>`));
// });

// Part Two

// defaults deck to 1 otherwise change it
let deckAPI = `https://deckofcardsapi.com/api/deck`;

// 1.
$.getJSON(`${deckAPI}/new/draw/`).then((draw) => {
  console.log(`${draw.cards[0].value} of ${draw.cards[0].suit}`);
});

// 2.

$.getJSON(`${deckAPI}/new/draw/`)
  .then((data) => {
    card1 = data.cards[0];
    let deckId = data.deck_id;
    // chaining- we return another request instead of a value/variable
    // using the same deck, make a request for a new card
    return $.getJSON(`${deckAPI}/${deckId}/draw/`);
  })
  .then((data) => {
    let card2 = data.cards[0];
    [card1, card2].forEach(function (card) {
      console.log(`${card.value} of ${card.suit}`);
    });
  });

// 3.

let deckId = null;
function loadDeck() {
  $.getJSON(`${deckAPI}/new/shuffle/?deck_count=1`).then(function (deck) {
    console.log(deck);
    deckId = deck.deck_id;
    console.log(deckId);
  });
}

let eCount = 0;
$("#game-button").on("click", function (e) {
  e.preventDefault();
  console.log("clicked");
  // draw a new card- display card- until no cards left

  eCount += 1;
  $.getJSON(`${deckAPI}/${deckId}/draw/?count=1`).then((response) =>
    $("#card-list").append(
      `<img src="${response.cards[0].image}" alt="picture of ${response.cards[0].value} of ${response.cards[0].suit}}"></img>`
    )
  );

  if (eCount == 53) {
    $("#game-button").remove();
    alert("There are no more cards!");
  }
});

loadDeck();
