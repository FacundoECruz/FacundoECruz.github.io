function hasAtLeastOneAchievement(achievements) {
  const {
    isHighestScoreInARound,
    isTop3,
    isTopScoreInAGame,
    scoredTenOrMoreInARound,
    wasTopScoreInAGame,
  } = achievements;

  if(scoredTenOrMoreInARound > 0 || wasTopScoreInAGame > 0)
    return true
  if(isHighestScoreInARound || isTopScoreInAGame || isTop3)
    return true
  else
    return false
}

export default hasAtLeastOneAchievement;
