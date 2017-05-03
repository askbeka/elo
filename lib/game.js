const utils = require('./utils');
const elo = require('./elo');

function createPlayer(id, name) {
  return {
    id,
    name,
    wins: [],
    losses: [],
    score: 0,
    rating: 0,
  };
}

function createPlayers(playersList) {
  return playersList.reduce((players, [id, name]) => {
    players[id] = createPlayer(id, name);
    return players;
  }, {});
}

function playMatch(players, [winnerId, looserId]) {
  const winner = players[winnerId];
  const looser = players[looserId];
  const [newRatingWinner, newRatingLooser] = elo.getNewRatings(winner.rating, looser.rating);

  winner.wins.push(looserId);
  looser.losses.push(winnerId);
  winner.score += elo.SCORE_WIN;
  winner.rating = newRatingWinner;
  looser.rating = newRatingLooser;
}

function playMatches(players, matches) {
  matches.forEach(match => playMatch(players, match));
}

function getPlayerList(players) {
  return Object.keys(players)
    .map(id => players[id]);
}

function getSortedPlayerList(players) {
  return getPlayerList(players)
    .sort((playerOne, playerTwo) => {
      // compare by score
      let result = playerTwo.score - playerOne.score;
      // if equal
      if (utils.isZero(result)) {
        // compare by rating
        result = playerTwo.rating - playerOne.rating;
      }
      // if equal
      if (utils.isZero(result)) {
        // compare by wins
        result = playerTwo.wins.length - playerOne.wins.length;
      }
      // if equal
      if (utils.isZero(result)) {
        // compare by losses but in ascending order
        result = playerOne.losses.length - playerTwo.losses.length;
      }
      return result;
    });
}

function opponentsListFormatter(players, ids) {
  const names = ids.map(id => players[id].name);
  return names.length ? `${names.length} {${names.join(', ')}}` : 0;
}

function playerFormatter(players, player, index) {
  return player ? (
    `${index + 1}.
    name: ${player.name}
    score: ${player.score}
    rating: ${player.rating.toFixed(2)}
    wins: ${opponentsListFormatter(players, player.wins)}
    losses: ${opponentsListFormatter(players, player.losses)}`
  ) : 'No player';
}

module.exports = {
  createPlayers,
  playMatches,
  getSortedPlayerList,
  playerFormatter,
};
