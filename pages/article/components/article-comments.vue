<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control" 
          placeholder="Write a comment..." rows="3"
          v-model="commentBody">
        </textarea>
      </div>
      <div class="card-footer">
        <!-- <img :src="comments.author.image" class="comment-author-img" /> -->
        <button
          class="btn btn-sm btn-primary"
          @click="handleComment">
          Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }" class="comment-author">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAddComment } from "@/api/articles.js"

export default {
  name: "ArticleComments",
  props: {
    comments: {
      required: true,
      type: Array,
      default: () => ([])
    },
    slug: {}
  },
  components: {},
  data() {
    return {
      commentBody: ''
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    async handleComment() {
      const {data} = await apiAddComment(
        this.slug,
        {
          comment: {
            body: this.commentBody
          }
        }
      )
      console.log("comment---:",data)
      
    }
  }
}
</script>

<style scoped lang="scss">
</style>
