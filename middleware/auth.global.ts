export default defineNuxtRouteMiddleware((to, from) => {
  console.log("++++++");
  const authStore = useAuthStore();
  console.log("++++++");

  console.log("from to", from.path, to.path);
  if (to.path === '/') {
    return navigateTo('/explore')
  }

  if (to.path === "/explore") {
    return;
  }

  console.log("----------");
  console.log(authStore.isLogin);
  if (!authStore.isLogin) {
    authStore.setLoginDialog(true);
    if (to.path !== from.path) {
      return abortNavigation();
    }
    return
  } else {
    return;
  }
});
