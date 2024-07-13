
const API = {
  leaderboardURI: "https://wedev-api.sky.pro/api/leaderboard", // GET (read) + POST (send)

  getDataFromEndpoint(params) {
    let statusCode = 0

    return fetch(this.leaderboardURI, params)
      .then((response) => {
        statusCode = response.status

        return response.json()
      })
      .then((data) => {
        if (statusCode >= 400)
          throw new Error(data.error)

        return data
      })
  },


  readLeadersFromServer() {
    return this.getDataFromEndpoint({})
  },

  writeLeaderToServer(record) {
    const params = {
      method: "POST",
      body:   JSON.stringify({
        name: record.name,
        time: record.time,
      }),
    }

    return this.getDataFromEndpoint(params)
  },
}

export default API
