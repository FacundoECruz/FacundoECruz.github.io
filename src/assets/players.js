class Player {
  constructor(name){
    this.name = name;
    this.score = 0;
    this.bet = 0;
    this.lose = 0;
    this.history = [];
    // this.id = uuid();
  }

  saveResult(roundResult) {
    this.history.push(roundResult)
  }

  makeBet(qty) {
    this.bet = this.bet + qty;
  }
  
  winRound(betQty) {
    let roundResult = betQty + 5
    this.score = this.score + roundResult;
    this.saveResult(roundResult)
  }
  
  loseRound(loseQty) {
    let roundResult = -loseQty
    this.score = this.score + loseQty;
    this.saveResult(roundResult)
  }
}

const playersNames = ["Ani", "Facu", "Ale", "Raul"];
let players = []

for (let i = 0; i < playersNames.length; i++) {
  let player = new Player(playersNames[i])
  players.push(player)
}

export default players;