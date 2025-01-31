type UseFetchOptions = {
  key?: string;
  method?: 'GET' | 'POST' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE';
  query?: any;
  params?: any;
  body?: RequestInit["body"] | Record<string, any>;
  headers?: Record<string, string> | [key: string, value: string][] | Headers;
  baseURL?: string;
  server?: boolean;
  lazy?: boolean;
  immediate?: boolean;
  deep?: boolean;
  dedupe?: "cancel" | "defer";
  pick?: string[];
};

export const commonUseFetch = <T>(apiUrl: string, options: UseFetchOptions) => {
  const authStore = useAuthStore();
  const { immediate = true, query, ...fetchOptions } = options;
  const runtimeConfig = useRuntimeConfig();

  const defaultOptions = {
    baseURL: runtimeConfig.public.apiBase,
    query,
    // 可以在这里添加通用的请求头等配置
    onResponseError: async (context: any) => {
      const { response } = context;
      switch (response.status) {
        case 401:
          // 处理未授权
          ElMessage.error(response._data?.message || '没有权限访问')
          authStore.setLoginDialog(true);
          break;
        case 403:
          // 处理禁止访问
          ElMessage.error(response._data?.message || '没有权限访问')
          break;
        case 500:
          // 处理服务器错误
          ElMessage.error(response._data?.message || "服务器错误，请稍后重试");
          break;
        default:
          // 处理其他错误
          ElMessage.error(response._data?.message || response.statusText || "请求失败");
      }
    },
    onRequest({ options }: any) {
      // 设置请求头
      options.headers = options.headers || {};
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${authStore.token}`,
      } as Headers;
    },
  };

  console.log("fetchOptions", fetchOptions);

  // 如果不需要立即执行，使用 lazy 选项
  const finalOptions: UseFetchOptions = {
    ...defaultOptions,
    ...fetchOptions,
    lazy: !immediate,
    immediate,
  };
  console.log("finalOptions", finalOptions);
  console.log('触发调用--------------')
  return useFetch<T>(apiUrl, finalOptions as any);
};

export const commoneFetch = async <T>(apiUrl: string, options: UseFetchOptions) => {
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();

  const defaultOptions = {
    baseURL: runtimeConfig.public.apiBase,
    // 可以在这里添加通用的请求头等配置
    onResponseError: async (context: any) => {
      // if (!window) {
      //   return
      // }
      // console.log('commoneFetch context', context)
      const { response } = context;
      switch (response.status) {
        case 401:
          // 处理未授权
          // console.log('response._data', response._data)
          window && ElMessage.error(response._data?.message || '没有权限访问')
          authStore.setLoginDialog(true);
          break;
        case 403:
          // 处理禁止访问
          window && ElMessage.error(response._data?.message || '没有权限访问')
          break;
        case 500:
          // 处理服务器错误
          window && ElMessage.error(response._data?.message || "服务器错误，请稍后重试");
          break;
        default:
          // 处理其他错误
          window && ElMessage.error(response._data?.message || response.statusText || "请求失败");
      }
    },
    onRequest({ options }: any) {
      // 设置请求头
      options.headers = options.headers || {};
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${authStore.token}`,
      } as Headers;
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options
  }

  return await $fetch<T>(apiUrl, finalOptions);
}

