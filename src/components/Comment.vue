<template>
<md-list-item md-expand>
  <div class="md-list-item-text">
    <span class="md-title">{{ title }}</span>
    <span class="md-subheading">{{ author }} さん</span>
  </div>
  <div class="md-list-item-text">
    <span class="md-caption" style="text-align: right">{{ formatDate(postedAt) }}</span>
  </div>
  <div slot="md-expand">
    <p>{{ comment }}}</p>
  </div>
</md-list-item>
</template>

<style lang="scss" scoped>
.md-list-item {
  width: 100%;
  display: inline-block;
  border: 1px solid rgba(#000, .12);
}
.p {
  word-break: keep-all;
}
</style>

<script>

import moment from 'moment'

export default {
  name: 'Comment',
  props: [ 'title', 'comment', 'author', 'postedAt' ],
  methods: {
    formatDate (milliEpoch) {
      const date = new Date(milliEpoch * 1000)
      return moment(date).format('YYYY.MM.DD HH:mm')
    }
  }
}
</script>
