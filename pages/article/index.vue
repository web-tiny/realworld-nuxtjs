<template>
<div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <article-meta :article="article"></article-meta>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article"></article-meta>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <article-comments 
          :comments="comments"
          :slug="article.slug"></article-comments>
      </div>

    </div>

  </div>
</div>

</template>

<script>
import { apiArticleDetail, apiArticleComment } from "@/api/articles.js"
import MarkDown from "markdown-it"


export default {
  name: 'ArticleIndex',
  middleware: 'authenticated',
  props: {},
  components: {
    "article-meta": () => import("./components/article-meta"),
    "article-comments": () => import("./components/article-comments")
  },
  async asyncData({params}) {
    const {data} = await apiArticleDetail(params.slug)
    const { article } = data
    article.body = new MarkDown().render(article.body)
    return {
      article
    }
  },
  data() {
    return {
      comments: []
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  created() {
    this.getComments();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    async getComments() {
      const {data} = await apiArticleComment(this.article.slug)
      console.log("comments:",data)
      this.comments = data.comments
    }
  }
}
</script>

<style scoped lang="scss">
</style>
