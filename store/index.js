export const state = () => ({
  bots: [
    'AXSBUSD',
    'AVAXBUSD',
    'VETBUSD',
    'DOTBUSD',
    'LINKBUSD',
    'XLMBUSD',
    'ATMUSDT',
    'EGLDUSDT',
    'AVAXUSDT',
    'NKNUSDT',
    'ETCUSDT',
    'FTMUSDT'
  ]
})

export const mutations = {
  add (state, name) {
    state.bots.push(name)
  },
  delete (state, name) {
    state.bots.splice(state.bots.indexOf(name), 1)
  }
}
