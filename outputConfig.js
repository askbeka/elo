const game = require('./lib/game');
const utils = require('./lib/utils');

module.exports = {
  show_ranking: {
    dataProvider: (players) => {
      const sortedPlayerList = game.getSortedPlayerList(players);
      return [players, sortedPlayerList];
    },
    formatter: (players, sortedPlayerList) => (
      sortedPlayerList.map((...args) => game.playerFormatter(players, ...args))
      .join(utils.LINE_SEPARATOR)
    ),
  },
  show_rank: {
    dataProvider: (players, playerName) => {
      const sortedPlayerList = game.getSortedPlayerList(players);
      const index = sortedPlayerList.findIndex(player => player.name === playerName);
      const player = sortedPlayerList[index];
      return [players, player, index];
    },
    formatter: game.playerFormatter,
  },
  suggest_new: {
    dataProvider: (players) => {
      const sortedPlayerList = game.getSortedPlayerList(players);
      const matches = [];
      const length = sortedPlayerList.length;
      let i = 0;
      if (!utils.isEven(length)) {
        matches.push([sortedPlayerList[i].id, sortedPlayerList[i + 1].id]);
        i = 1;
      }
      for (i; i < length; i += 2) {
        matches.push([sortedPlayerList[i].id, sortedPlayerList[i + 1].id]);
      }
      return [matches];
    },
    formatter: matches => matches.map(match => match.join(utils.SPACE)).join(utils.NEW_LINE),
  },
};
