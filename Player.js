class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var me = gameState.players[gameState.in_action];
    var hole_cards = me.hole_cards;
    
    if(hole_cards[0].rank === hole_cards[1].rank) {
      return 10000;
    } else {
      if (gameState.current_buy_in < gameState.small_blind * 4) {
        return gameState.current_buy_in - me.bet - gameState.minimum_raise;
      } else {
        return 0; 
      }
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
