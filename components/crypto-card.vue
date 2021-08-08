<template>
  <v-skeleton-loader
    :loading="loading"
    type="card"
  >
    <v-card rounded="lg">
      <v-card-text class="text-center">
        <v-row>
          <v-col>
            <v-img :src="getIcon(ticker)" height="50" contain />
          </v-col>
        </v-row>
        <v-row class="mb-8">
          <v-col>
            <span class="subtitle-1">{{ name }}</span>
            <h3 v-if="waiting" class="my-5 font-weight-bold text-sm-caption">
              En attente d'une oportunité d'achat
            </h3>
            <h3 v-else class="font-weight-bold text-lg-h4" :class="(currentPol > 0 ? 'success--text' : 'error--text')">
              {{ currentPol + '$' }}
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-chip
              v-if="!waiting"
              class="ma-2"
              :color="(currentPol > 0 ? 'success' : 'error')"
              outlined
            >
              <v-icon left>
                fa-long-arrow-alt-up
              </v-icon>
              {{ percentile }}
            </v-chip>
            <v-icon v-else>
              fa-spinner fa-spin
            </v-icon>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'CryptoCard',
  props: {
    ticker: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      waiting: false,
      buyPrice: null,
      buyQty: null,
      currentPrice: null,
      currentPol: null
    }
  },
  computed: {
    percentile () {
      return ((this.currentPrice - this.buyPrice) / this.currentPrice * 100).toFixed(2) + '%'
    }
  },
  mounted () {
    this.$axios.get(`/trades/${this.name}`).then((response) => {
      if (response.data === null) {
        this.waiting = true
        this.loading = false
      } else {
        const lastTrade = response.data
        this.buyPrice = lastTrade.price
        this.buyQty = lastTrade.origQty
        this.$axios.get(`/prices/${this.name}`).then((response) => {
          this.currentPrice = response.data.price
          this.currentPol = ((this.currentPrice * this.buyQty) - (this.buyQty * this.buyPrice)).toFixed(2)
          this.loading = false
        }).catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
        })
      }
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e)
    })
  },
  methods: {
    getIcon (ticker) {
      return `https://cryptoicons.org/api/icon/${ticker}/200`
    }
  }
}
</script>

<style scoped>

</style>
