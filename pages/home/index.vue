<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="user" class="nav-item">
              <nuxt-link :to="{
                name: 'home',
                query: {
                  tab: 'you_feed'
                  }
                }"
                class="nav-link"
                exact
                :class="{
                  active: tab === 'you_feed'
                }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }"
                exact
                class="nav-link"
                :class="{
                  active: tab === 'global_feed'
                }">Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: tag
                  }
                }"
                exact
                class="nav-link"
                :class="{
                  active: tab === 'tag'
                }">#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview"
          v-for="article in articles"
          :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }" class="author">{{ article.author.username }}</nuxt-link>
              <span class="date">{{article.createdAt | date("YYYY-MM-DD hh:mm:ss")}}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{
                active: article.favorited
              }"
              :disabled="article.favoritedDisabled"
              @click="handleFavorite(article)">
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
              params: {
                slug: article.slug
              }
            }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <!-- <div class="article-preview">
          <div class="article-meta">
            <a href="profile.html"><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
            <div class="info">
              <a href="" class="author">Albert Pai</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 32
            </button>
          </div>
          <a href="" class="preview-link">
            <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div> -->

        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: item === page
              }"
              v-for="item in totalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }"
              >{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- 标签 -->
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link
              v-for="tag in tags"
              :key="tag"
              :to="{
                name: 'home',
                query: {
                  tag: tag,
                  tab: 'tag'
                }
              }"
              class="tag-pill tag-default">
              {{ tag }}
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { to } from 'await-to-js'
import { apiGetArticles, apiGetTags, apiFeedArticles, apiFavorite, apiUnFavorite } from "@/api/articles.js"
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag', 'tab'],
  components: {},
  async asyncData({query, store}) {
    // 获取标签
    const { tag, tab } = query
    const { state } = store
    const tagData = await to(apiGetTags())

    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const reqParams = {
      limit,
      offset: (page - 1) * limit,
      tag
    }
    // 获取全部文章
    const articleData = await to(apiGetArticles(reqParams))
    // 获取关注的文章
    const feedArticle = await to(apiFeedArticles(reqParams))

    // 判断是调用关注的文章还是全局的文章
    const loadArticle = state.user && tab === "you_feed" ? feedArticle : articleData

    // 将同步任务转为异步执行
    const req =  await Promise.all([tagData, articleData])
    if (req) {
      // debugger
      // console.log(req)
      const {tags} = req[0][1].data
      const {articles, articlesCount} = req[1][1].data
      return {
        articles,
        articlesCount,
        limit,
        page,
        tags,
        tag,
        tab: tab || "global_feed"
      }
    }
  },
  data() {
    return {
      data: 'home'
    }
  },
  created() {},
  mounted() {},
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(["user"])
  },
  watch: {},
  methods: {
    async handleFavorite(article) {
      article.favoritedDisabled = true
      if (article.favorited) { // 取消点赞
        await apiFavorite(article.slug)
        article.favorited = false
        article.favoritesCount +=-1
      } else { // 添加点赞
        await apiUnFavorite(article.slug)
        article.favorited = true
        article.favoritesCount +=1
      }
      article.favoritedDisabled = false
    }
  }
}
</script>

<style scoped lang="scss">
</style>
