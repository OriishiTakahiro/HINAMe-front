<template>
  <div>
    <h1>みんなからの情報</h1>
    <md-list class="md-scrollbar">
      <Comment
        v-for="(m, index) in comments"
        :key="index"
        :title="m.title"
        :comment="m.comment"
        :author="m.author"
        :postedAt="m.postedAt"
      />
    </md-list>
  </div>
</template>

<style lang="scss" scoped>
  $list-width: 320px;

  .full-control {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
  }

  .list {
    border: 2px solid rgba(#000, .12);
    width: $list-width;
  }

  .full-control > .md-list {
    width: $list-width;
    max-width: 100%;
    height: 400px;
    display: inline-block;
    border: 1px solid rgba(#000, .12);
    vertical-align: top;
  }

  .md-list {
    max-width: 800px;
    max-height: 300px;
    overflow: auto;
    margin: auto;
    border: 1px solid rgba(#000, .12);
  }

  .control {
    min-width: 250px;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
</style>

<script>

import axios from 'axios'
import Comment from '@/components/Comment'

const COMMENTS_ENDPOINT = `${process.env.BACKEND_HOST}/api/comment`

export default {
  name: 'CommentList',
  components: { Comment },
  data () {
    return {
      comments: [],
      commentsHTML: ''
    }
  },
  methods: {
    async refleshComments () {
    },
    async loadComments (shelterID) {
      axios.get(`${COMMENTS_ENDPOINT}/by_shelter_id/${shelterID}`).then((response) => {
        if (response.request.status === 200) {
          this.comments = []
          response.data.forEach((row) => {
            this.comments.push({
              title: row.Title,
              comment: row.Body,
              author: row.Author,
              postedAt: row.UpdatedAt
            })
          })
        }
      })
    }
  }
}
</script>
