class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var me = gameState.players[gameState.in_action];
    var hole_cards = me.hole_cards;
    
    if(hole_cards[0].rank === hole_cards[1].rank && [9,10,"J","Q","K","A"].indexOf(hole_cards[1].rank) >= 0) {
      return 10000;
    } else {
      console.log("SMALL BLIND: " + gameState.small_blind + " BUY IN:" + gameState.current_buy_in);
      if (gameState.current_buy_in < gameState.small_blind * 4) {
        return Math.max(0, gameState.current_buy_in - me.bet + gameState.minimum_raise);
      } else {
        return 0; 
      }
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
