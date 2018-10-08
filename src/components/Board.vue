<template>
  <div>
    <h1>{{ shelterName }}</h1>
    <md-content class="md-scrollbar">
      <div v-html="content">
      </div>
    </md-content>
  </div>
</template>

<style lang="scss" scoped>
.md-content {
  max-width: 98%;
  max-height: 300px;
  overflow: auto;
  margin: auto;
  border: 1px solid rgba(#000, .12);
}
</style>

<script>

import axios from 'axios'

const BODARD_ENDPOINT = `${process.env.BACKEND_HOST}/api/board/html`

export default {
  name: 'Board',
  data () {
    return {
      shelterID: -1,
      shelterName: '避難所',
      content: ''
    }
  },
  methods: {
    async switchShelter (shelterID, shelterName) {
      this.shelterName = shelterName
      axios.get(`${BODARD_ENDPOINT}/${shelterID}`).then((response) => {
        if (response.request.status === 200) {
          this.content = response.data
        }
      })
    }
  }
}
</script>
