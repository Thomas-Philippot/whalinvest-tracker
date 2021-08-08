<template>
  <v-row justify="start" align="center">
    <v-col v-for="(bot, id) in bots" :key="id" cols="12" sm="8" md="3">
      <crypto-card :ticker="extractTicker(bot)" :name="bot" />
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
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
    }
  },
  methods: {
    extractTicker (name) {
      return name.replace('USDT', '').replace('BUSD', '')
    }
  }
}
</script>
