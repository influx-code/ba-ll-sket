wx.cloud.init({ env: 'test-123' })

const db = wx.cloud.database()
const users = db.collection('users')
const teams = db.collection('teams')
const games = db.collection('games')
const _ = db.command

class DbHelper {
  async addUser(data) {
    return await users.add({ data })
  }

  async newTeam(leaderId) {
    return await teams.add({ data: { leaderId, created: Date.now() } })
  }

  async listTeams() {
    return await teams.get()
  }

  async joinTeam(teamId, memberId) {
    return await teams.doc(teamId).update({
      data: {
        members: _.push(memberId)
      }
    })
  }

  async leaveTeam(teamId, memberId) {
    const doc = await teams.doc(teamId).get()
    const members = []
    for (let m of doc.members) {
      if (m != memberId) {
        members.push(m)
      }
    }

    return await teams.doc(teamId).update({
      data: {
        members
      }
    })
  }

  async newGame(teamId) {
    const doc = await teams.doc(teamId).get()
    const game = await games.add({
      data: {
        hostTeam: {
          id: teamId,
          name: 'JJR',
          members: doc.members,
          score: 0
        },
        created: Date.now()
      }
    })
  }

  async listGames() {
    return await games.get()
  }

  async joinGame(gameId, teamId) {
    const doc = await teams.doc(teamId).get()
    return await games.doc(gameId).update({
      data: {
        guestTeam: {
          id: teamId,
          name: 'ZRC',
          members: doc.members,
          score: 0
        }
      }
    })
  }

  async plusOneScore(gameId, teamId, userId) {
    const game = await games.doc(gameId).get()
    const data = { hostTeam: {}, guestTeam: {} }
    if (game.hostTeam.id == teamId) {
      data.hostTeam[userId] = _.inc(1)
    }
    else {
      data.guestTeam[userId] = _.inc(1)
    }

    return await games.doc(gameId).update({ data })
  }

  async endGame(gameId) {
    return await games.doc(gameId).update({ data: { ended: Date.now() } })
  }
}