export const checkPlayerAchievements = (player, achievements) => {
  
  const {
    topScoreInAGame, 
    wasTopScoreInAGame, 
    top3, 
    highestScoreInARound, 
    scoredTenOrMoreInARound} = achievements;
  
  let stats = {
    isTopScoreInAGame: checkTopScoreInAGame(player, topScoreInAGame),
    wasTopScoreInAGame: checkWasTopScoreInAGame(player, wasTopScoreInAGame),
    isTop3: checkTop3(player, top3),
    isHighestScoreInARound: checkHighestScoreInARound(player, highestScoreInARound),
    scoredTenOrMoreInARound: checkScoredTenOrMore(player, scoredTenOrMoreInARound)
  }

  function checkTopScoreInAGame(p, topScore) {
    let isTop = false;
    topScore.map(t => {
      if(t.username === p)
        isTop = true;
    })
    return isTop;
  }

  function checkWasTopScoreInAGame(p, prevTops) {
    let wasTop = 0;
    prevTops.map(t => {
      if(t.username === p)
        wasTop += 1;
    })
    return wasTop;
  }

  function checkTop3(p, top3) {
    let isInTop3 = false;
    top3.map(t => {
      if(t.username === p)
        isInTop3 = true;
    })
    return isInTop3;
  }

  function checkHighestScoreInARound(p, highestRound) {
    let isHighestRound = false;
    highestRound.map(t => {
      if(t.username === p)
        isHighestRound = true;
    })
    return isHighestRound;
  } 

  function checkScoredTenOrMore(p, tenOnMore) {
    let scoredTenOrMore = 0;
    tenOnMore.map(t => {
      if(t === p)
        scoredTenOrMore += 1;
    })
    return scoredTenOrMore;
  }

  return stats;   
}