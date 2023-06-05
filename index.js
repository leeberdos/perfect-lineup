const validateLineup = (lineup) => {
  // Use reduce to add all salaries
  const sum = lineup.reduce((accumulator, player) => accumulator + player.salary, 0)

  // Return true if sum is less than $45000 
  if (sum > 45000) {
    return false
  }

  // If more than 9 players on team, return false
  if (lineup.length > 9) {
    return false
  }

  // if there are too many players from one team ... reduce method
  // loop through the players and generate an array of every team and how many times they appear
  // [{teamId: 22, count: 1},{teamId: 23, 2}]
  const teamIds = lineup.reduce((accumulator, player) => {
    // make a variable to hold the current players, team id
    let teamId = player.teamId
    // find the index of the current team in the accumulator
    let existingIndex = accumulator.findIndex((foundTeamId) => {
      // return true if the foundTeamId object's teamId is the same as the player's teamId
      return teamId === foundTeamId.teamId
    })

    if (existingIndex > -1) {
      // increment the current Teamid inside the accummulator by 1
      accumulator[existingIndex].count++
    } else {
      // build a new teamid object, and push into accumulator
      let newTeamIdObject = { teamId: teamId, count: 1 }

      accumulator.push(newTeamIdObject)
    }

    return accumulator
  }, [])

  // loop again if occurance of any team is greater than 2 return false
  const invalidTeamCount = teamIds.find((teamId) => {
    if (teamId.count > 2) {
      return true
    } else {
      return false
    }
  })

  if (invalidTeamCount) {
    return false
  }

  // if there are too many players from single game use reduce method to create new object to count number of game ID's in each object
  // loop through the players and generate an array of every team and how many times they appear
  // e.g.  [{gameId: 22, count: 1},{gameId: 23, 2}]
  const gameIds = lineup.reduce((accumulator, player) => {
    // make a variable to hold the current players, game id
    let gameId = player.gameId
    // find the index of the current game in the accumulator
    let existingIndexTwo = accumulator.findIndex((foundGameId) => {
      // return true if the foundgameId object's gameId is the same as the player's gameId
      return gameId === foundGameId.gameId
    })

    if (existingIndexTwo > -1) {
      // increment the current gameid inside the accummulator by 1
      accumulator[existingIndexTwo].count++
    } else {
      // build a new gameid object, and push into accumulator
      let newGameIdObject = { gameId: gameId, count: 1 }

      accumulator.push(newGameIdObject)
    }

    return accumulator
  }, [])

  // loop again if occurance of any team is greater than 2 return false
  const invalidGameCount = gameIds.find((gameId) => {
    if (gameId.count > 3) {
      return true
    } else {
      return false
    }
  })

  if (invalidGameCount) {
    return false
  }

  // return false if wrong number players at OF(3)
  let outFielders = lineup.filter((player) => {
    return player.position === 'OF' ? true : false
  })

  if (outFielders.length !== 3) return false

  // return  if wrong number players at 1b(1)
  let firstBasemen = lineup.filter((player) => {
    return player.position === '1B' ? true : false
  })

  if (firstBasemen.length !== 1) {
    return false
  }

  // return  if wrong number players at 2b(1)
  let secondBase = lineup.filter((player) => {
    return player.position === '2B' ? true : false
  })

  if (secondBase.length !== 1) {
    return false
  }

  // return  if wrong number players at 3b(1)
  let thirdBase = lineup.filter((player) => {
    return player.position === '3B' ? true : false
  })

  if (thirdBase.length !== 1) {
    return false
  }

  // return  if wrong number players at p(1)
  let pitcher = lineup.filter((player) => {
    return player.position === 'P' ? true : false
  })

  if (pitcher.length !== 1) {
    return false
  }

  // return  if wrong number players at c(1)
  let catchers = lineup.filter((player) => {
    return player.position === 'C' ? true : false
  })

  if (catchers.length !== 1) {
    return false
  }

  // return  if wrong number players at ss(1)
  let shortS = lineup.filter((player) => {
    return player.position === 'SS' ? true : false
  })

  if (shortS.length !== 1) {
    return false
  }

  // RETURN TRUE as all other conditions are correct
  return true
}

module.exports = validateLineup
