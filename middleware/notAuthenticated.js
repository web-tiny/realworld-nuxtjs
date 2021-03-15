export default function({ store, redirect }) {
  // 如果已经登陆,做拦截,去首页
  if (store.state.user) {
    return redirect("/")
  }
}