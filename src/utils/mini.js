import router from '@/router'

export default {
  showToast(opts) {

  },
  back() {
    router.back()
  },
  forward(url, { replace, back, ...query } = {}) {
    const type = !replace ? 'push' : 'replace'
    console.log(url, query)
    router[type](
      {
        path: url,
        query,
      }
    )
  },
  popup(type) {
    // 弹出页面
    console.log(type)
  },
}
