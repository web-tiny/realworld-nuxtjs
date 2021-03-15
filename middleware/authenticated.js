// 验证是否登陆的中间件
export default function({ store, redirect }) {
  // 如果没有登陆,做拦截
  if (!store.state.user) {
    return redirect("/login")
  }
}