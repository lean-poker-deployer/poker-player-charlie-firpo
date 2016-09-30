class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    var hole_cards = Player.me(gameState).hole_cards;

    if(Player.pair(hole_cards) && [9,10,"J","Q","K","A"].indexOf(hole_cards[1].rank) >= 0) {
      return Math.max(Player.minumumRaise(gameState), Math.floor(Player.me(gameState).stack / 3));
    } else if(Player.pair(hole_cards) && Player.inHeadsUp(gameState)) {
      return 10000;
    } else if(Player.suited(hole_cards) && Player.inHeadsUp(gameState)) {
      if(gameState.community_cards.length === 0) {
        return Player.call(gameState)
      } else if(Player.flush(gameState)) {
        return Math.max(Player.minumumRaise(gameState), Math.floor(Player.me(gameState).stack / 3));
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  static me(gameState) {
    return gameState.players[gameState.in_action];
  }

  static pair(hole_cards) {
    return hole_cards[0].rank === hole_cards[1].rank;
  }

  static suited(hole_cards) {
    return hole_cards[0].suit === hole_cards[1].suit;
  }

  static flush(gameState) {
    return Player.suited(Player.me(gameState).hole_cards) && gameState.community_cards.filter(function(card) {
        return Player.me(gameState).hole_cards[0].suit === card.suit;
      }).length > 2;
  }

  static inHeadsUp(gameState) {
    var activePlayers = gameState.players.filter(function(player) {
      return player.status !== 'out';
    });
    return activePlayers.length < 3;
  }

  static minumumRaise(gameState) {
    return Math.max(0,gameState.current_buy_in - Player.me(gameState).bet + gameState.minimum_raise);
  }

  static call(gameState) {
    return Math.max(0,gameState.current_buy_in - Player.me(gameState).bet);
  }

  static isSmallBet(gameState) {
    return gameState.current_buy_in < gameState.small_blind * 4;
  }

  static showdown(gameState) {
  }

}

module.exports = Player;
