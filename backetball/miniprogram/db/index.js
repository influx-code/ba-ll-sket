const db = wx.cloud.database()
const users = db.collection('users')
const teams = db.collection('teams')
const games = db.collection('games')
const _ = db.command

class DbHelper {
  addUser(data) {
    return users.add({ data })
  }

  newTeam(leaderId) {
    return teams.add({ data: { leaderId, created: Date.now() } })
  }

  listTeams() {
    return teams.get()
  }

  joinTeam(teamId, memberId) {
    return teams.doc(teamId).update({
      data: {
        members: _.push(memberId)
      }
    })
  }

  leaveTeam(teamId, userId) {
    return new Promise((resolve, reject) => {
      teams.doc(teamId).get().then(doc => {

        if (doc.leaderId == userId) {
          teams.doc(teamId).remove().then(resolve).catch(reject)
          return
        }

        const members = []
        for (let m of doc.members) {
          if (m != userId) {
            members.push(m)
          }
        }

        teams.doc(teamId).update({ data: { members } }).then(resolve).catch(reject)
      })
    })
  }

  newGame(teamId) {
    return new Promise((resovle, reject) => {
      teams.doc(teamId).get().then(doc => {
        games.add({
          data: {
            hostTeam: {
              id: teamId,
              name: 'JJR',
              members: doc.members,
              score: 0
            },
            created: Date.now()
          }
        }).then(resovle).catch(reject)
      })
    })
  }

  listGames() {
    return games.get()
  }

  joinGame(gameId, teamId) {
    return new Promise((resolve, reject) => {
      teams.doc(teamId).get().then(doc => {
        games.doc(gameId).update({
          data: {
            guestTeam: {
              id: teamId,
              name: 'ZRC',
              members: doc.members,
              score: 0
            }
          }
        }).then(resolve).catch(reject)
      })
    })
  }

  plusOneScore(gameId, teamId, userId) {
    return new Promise((resolve, reject) => {

      games.doc(gameId).get().then(game => {
        const data = { hostTeam: {}, guestTeam: {} }
        if (game.hostTeam.id == teamId) {
          data.hostTeam[userId] = _.inc(1)
        }
        else {
          data.guestTeam[userId] = _.inc(1)
        }

        games.doc(gameId).update({ data }).then(resolve).catch(reject)
      })
    })

  }

  endGame(gameId) {
    return games.doc(gameId).update({ data: { ended: Date.now() } })
  }
}

module.exports = DbHelper;