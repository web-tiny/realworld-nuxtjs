import { request } from "@/plugins/request"

export const apiGetArticles = (params) => request({
  method: "get",
  url: "/api/articles",
  params
})

// 获取标签列表
export const apiGetTags = () => request({
  method: "get",
  url: "/api/tags"
})

// 获取关注的文章列表
export const apiFeedArticles = params => request({
  method: "get",
  url: "/api/articles/feed",
  params
})

// 点赞文章
export const apiFavorite = slug => request({
  method: "post",
  url: `/api/articles/${slug}/favorite`
})

// 取消点赞
export const apiUnFavorite = slug => request({
  method: "DELETE",
  url: `/api/articles/${slug}/favorite`
})

// 获取文章详情
export const apiArticleDetail = slug => request({
  method: "get",
  url: `/api/articles/${slug}`
})

// 获取文章详情
export const apiArticleComment = slug => request({
  method: "get",
  url: `/api/articles/${slug}/comments`
})

// 添加一个评论
export const apiAddComment = (slug, data) => request({
  method: "POST",
  url: `/api/articles/${slug}/comments`,
  data,
})
