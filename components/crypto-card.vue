<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      type="card"
    >
      <v-card rounded="lg" class="crypto-card">
        <v-app-bar flat dense elevation="0">
          <v-spacer />
          <v-menu offset-y>
            <v-list>
              <v-list-item @click="handleDeleteBot">
                <v-list-item-icon>
                  <v-icon>fa-trash</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Supprimer</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <template #activator="{ on, attrs }">
              <v-btn
                color="white"
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>fa-ellipsis-v</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </v-app-bar>
        <v-card-text class="text-center">
          <v-row>
            <v-col class="mt-2">
              <v-img
                :src="getIcon(ticker)"
                lazy-src=""
                height="50"
                contain
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>
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
  </div>
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
      menu: false,
      x: 0,
      y: 0,
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
      return `https://icons.bitbot.tools/api/${ticker}/128x128`
    },
    handleDeleteBot () {
      this.$emit('delete-bot', this.name)
    }
  }
}
</script>

<style scoped>
.crypto-card {
  min-height: 300px;
}
</style>
