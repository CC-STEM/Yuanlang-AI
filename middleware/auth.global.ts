export default defineNuxtRouteMiddleware((to, from) => {
  console.log('from to', from.path, to.path)
})
