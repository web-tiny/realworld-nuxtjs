<template>
<div class="article-meta">
  <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image" />
  </nuxt-link>
  <div class="info">
    <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }" class="author">{{article.author.username}}
    </nuxt-link>
    <span class="date">{{article.createAt | date("YYYY-MM-DD hh:mm:ss")}}</span>
  </div>

  <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}">
    <i class="ion-plus-round"></i>
    &nbsp;
    Follow Eric Simons <span class="counter">(10)</span>
  </button>
  &nbsp;
  <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}">
    <i class="ion-heart"></i>
    &nbsp;
    Favorite Post <span class="counter">{{article.favoritesCount}}</span>
  </button>
</div>
</template>

<script>
export default {
  props: {
    article: {
      required: true,
      type: Object, 
      default: () => ({})
    }
  },
  components: {},
  data() {
    return {
      data: 'comonents'
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
