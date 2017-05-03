# Game rankings
## Implement a ranking program using the Elo ranking algorithm.
### Given two files:
1. names, where each line has an ID number and a name for said ID
2. matches, where each line contains the ID of the two players of a match and the first one is the winner of said match.
### Implement a program that can read both files and then:
1. Score each player based on the games played
2. Generate a list of players sorted by score, their ranking (position in the list) and their number of wins and losses.
3. Generate a report for each person, showing with whom they played and how they fared.
4. Generate a list of suggested next matches.
### Implementation notes:
1. You can choose how to implement the different functionalities for the program. You may choose to implement it as a command line
parameter (e.g. "./elo names matches show_ranking", "elo names matches show_rank USER_NAME", etc).
2. Try to keep the output format independent of the main application logic (ie design it so that it is possible to add new output formats if
needed

# Work Done
### Tech used:
1. node.js v.7.7.1
2. eslint for ineditor linting
### How to:
1. `cd elo`
2. `npm i -g`
3. `elo [names_file] [matches_file] [command] [argument]`
#### OR
1. `cd elo`
2. `node index.js names.txt matches.txt [command] [argument]`
### Supported commands
1. `show_ranking` - shows sorted player list with report,
2. `show_rank [player_name]` - shows one player details in report
3. `suggest_new` - shows suggested matches based on sorting method in requirements
