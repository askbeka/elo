const IMPACT_FACTOR = 32;
const RATE_CONST = 400;
const SCORE_WIN = 1;
const SCORE_LOST = 0;

function getTransformedRating(rating) {
  return 10 ** (rating / RATE_CONST);
}

function getOpponentsExpectedScores(ratingPlayerOne, ratingPlayerTwo) {
  const transformedRatingPlayerOne = getTransformedRating(ratingPlayerOne);
  const transformedRatingPlayerTwo = getTransformedRating(ratingPlayerTwo);
  const transformedRatingSum = transformedRatingPlayerOne + transformedRatingPlayerTwo;
  return [
    transformedRatingPlayerOne / transformedRatingSum,
    transformedRatingPlayerTwo / transformedRatingSum,
  ];
}

function getNewRating(oldRating, expectedScore, actualScore) {
  return oldRating + (IMPACT_FACTOR * (actualScore - expectedScore));
}

function getNewRatings(winnerRating, looserRating) {
  const [
    expectedScoreWinner,
    expectedScoreLooser,
  ] = getOpponentsExpectedScores(winnerRating, looserRating);

  return [
    getNewRating(winnerRating, expectedScoreWinner, SCORE_WIN),
    getNewRating(looserRating, expectedScoreLooser, SCORE_LOST),
  ];
}

module.exports = {
  getNewRatings,
  SCORE_WIN,
};
