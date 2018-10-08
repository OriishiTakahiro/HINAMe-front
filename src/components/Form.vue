<template>
  <div>
    <md-field>
      <label>タイトル</label>
      <md-input v-model="title" maxlength="50" placeholder="コメントの概要など"></md-input>
    </md-field>

    <md-field>
      <label>名前</label>
      <md-input v-model="name" maxlength="20" placeholder="あなたの名前"></md-input>
    </md-field>

    <md-field>
      <label>コメント</label>
      <md-textarea v-model="comment" placeholder="伝えたい・質問したいこと" required></md-textarea>
    </md-field>

    <md-button class="md-raised md-primary" v-on:click="submitNewComment">投稿</md-button>

  </div>
</template>

<style lang="scss" scoped>
.md-field {
  max-width: 95%;
  margin: auto;
}
</style>

<script>

import axios from 'axios'

const SHELTERS_ENDPOINT = `${process.env.BACKEND_HOST}/api/comment`

export default {
  name: 'CommentForm',
  data () {
    return {
      shelterID: -1,
      title: '',
      name: '',
      comment: ''
    }
  },
  methods: {
    async submitNewComment () {
      const endpointURL = `${SHELTERS_ENDPOINT}/${this.shelterID}/${-1}`
      const params = {
        title: this.title,
        author: this.name,
        body: this.comment
      }
      axios.post(endpointURL, params).then((response) => {
        if (response.request.status === 204) {
          this.title = ''
          this.name = ''
          this.comment = ''
        }
      })
    },
    setShelterID (idx) {
      this.shelterID = idx
    }
  }
}
</script>
