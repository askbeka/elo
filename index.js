#! /usr/bin/env node

const outputConfig = require('./outputConfig');
const game = require('./lib/game');
const utils = require('./lib/utils');
const promiseLines = require('./lib/promiseLines');

const [namesFile, matchesFile, command, argument] = utils.getArguments();

if (!outputConfig[command]) {
  throw new Error(`Command is not supported: ${command}`);
}

async function start() {
  try {
    // get list of id name pairs
    const nameList = await promiseLines(utils.getAbsolutePath(namesFile), utils.splitBySpace);
    // create players
    const players = game.createPlayers(nameList);
    // get list of winner and looser pairs
    const matchList = await promiseLines(utils.getAbsolutePath(matchesFile), utils.splitBySpace);
    // play matches
    game.playMatches(players, matchList);

    const commandProcessor = outputConfig[command];
    // get the data for mapped command
    const data = commandProcessor.dataProvider(players, argument);
    // format the data provided
    const result = commandProcessor.formatter(...data);
    // output the result to console
    console.log(result);
  } catch (error) {
    utils.handleError(error);
  }
}

start();

process.on('uncaughtException', utils.handleError);
