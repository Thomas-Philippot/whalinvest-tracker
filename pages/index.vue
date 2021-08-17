<template>
  <v-row justify="start" align="center">
    <v-col
      v-for="(bot, id) in bots"
      :key="id"
      cols="12"
      xs="6"
      sm="6"
      md="3"
    >
      <crypto-card :ticker="extractTicker(bot)" :name="bot" @delete-bot="deleteBot" />
    </v-col>
    <v-col cols="12" xs="6" sm="6" md="3" class="text-center">
      <v-btn icon @click="dialog = true">
        <v-icon>fa-plus</v-icon>
      </v-btn>
    </v-col>
    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title>Ajouter un robot</v-card-title>
        <v-card-text>
          <v-text-field v-model="newBotName" label="Nom de la paire" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn outlined @click="dialog = false">
            Annuler
          </v-btn>
          <v-btn color="primary" @click="addBot">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      dialog: false,
      newBotName: null
    }
  },
  computed: {
    bots () {
      return this.$store.state.bots
    }
  },
  methods: {
    extractTicker (name) {
      return name.replace('USDT', '').replace('BUSD', '')
    },
    addBot () {
      this.$store.commit('add', this.newBotName)
      this.newBotName = null
      this.dialog = false
    },
    deleteBot (name) {
      this.$store.commit('delete', name)
    }
  }
}
</script>

<style scoped>
.plus-card {
  min-height: 300px;
}
</style>
