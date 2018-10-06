<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">入力フォーム</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('Name')">
                <label for="first-name">名前</label>
                <md-input name="name" id="name-form" autocomplete="住民さん" v-model="form.name" :disabled="sending" />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="last-name">タイトル</label>
                <md-input name="title" id="title-form" autocomplete="概要を入れてください" v-model="form.title" :disabled="sending" />
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('body')">
            <label for="body">コメント</label>
            <md-input name="body" id="body-form" autocomplete="書き込み内容" v-model="form.body" :disabled="sending" />
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">コメント送信</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>
  export default {
    name: 'CommentForm'
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
