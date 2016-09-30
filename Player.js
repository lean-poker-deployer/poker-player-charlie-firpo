class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var hole_cards = Player.me(gameState).hole_cards;
    
    if(hole_cards[0].rank === hole_cards[1].rank && [9,10,"J","Q","K","A"].indexOf(hole_cards[1].rank) >= 0) {
      return 10000;
    // } else if(hole_cards[0].rank === hole_cards[1].rank && Player.isSmallBet(gameState)) {
    //   return Player.minumumRaise(gameState);
    } else {
      return 0;
    }
  }

  static me(gameState) {
    return gameState.players[gameState.in_action];
  }

  static minumumRaise(gameState) {
    return Math.max(0,gameState.current_buy_in - Player.me(gameState).bet + gameState.minimum_raise);
  }

  static isSmallBet(gameState) {
    return gameState.current_buy_in < gameState.small_blind * 4;
  }

  static showdown(gameState) {
  }

}

module.exports = Player;
