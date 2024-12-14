import type {
  GetModelInfoRes,
  GetModuleResourceInfoRes,
  DefaultAICreateRequest,
  AICreateResponse,
  GetAiArtWorkHistoryResponse,
  GetArtworkHistoryListRequest,
  GetArtworkHistoryDetailListRes,
  MJAICreateRequest,
  GetBatchDrawTaskKeysRes,
  GetBatchDrawTaskDetailsRes
} from "../types";

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
      console.log('response', response)
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

  const finalOptions = {
    ...defaultOptions,
    ...options
  }

  return await $fetch<T>(apiUrl, finalOptions);
}

export const getModelInfo = () => {
  const { data, status, error } = commonUseFetch<GetModelInfoRes>(
    "/api/wujie/getModelInfo",
    {
      pick: ["data"],
    }
  );
  return { data, status, error };
};

// export const getModuleResourceInfo = (model: number) => {
//   if (!model) {
//     return {};
//   }
//   const runtimeConfig = useRuntimeConfig();

//   const { data, status, error } = useFetch<GetModuleResourceInfoRes>(
//     `/api/wujie/getResourseModule?model=${model}`,
//     {
//       baseURL: runtimeConfig.public.apiBase,
//       pick: ["data"],
//     }
//   );
//   return { data, status, error };
// };

export const createAIByWujie = async (body: DefaultAICreateRequest) => {
  const runtimeConfig = useRuntimeConfig();

  return await commoneFetch<AICreateResponse>(`/api/wujie/createWithDefaultAI`, {
    method: "POST",
    body: body,
    baseURL: runtimeConfig.public.apiBase,
  });
};

export const createAIByMJ = async (body: MJAICreateRequest) => {
  const runtimeConfig = useRuntimeConfig();

  return await commoneFetch<AICreateResponse>(`/api/wujie/createWithMJ`, {
    method: "POST",
    body: body,
    baseURL: runtimeConfig.public.apiBase,
  });
};

// export const getArtworkHistoryKeyList = (
//   body: GetArtworkHistoryListRequest
// ) => {
//   const runtimeConfig = useRuntimeConfig();

//   const { data, status, error, refresh } =
//     useFetch<GetAiArtWorkHistoryResponse>(`/api/wujie/getDrawList`, {
//       baseURL: runtimeConfig.public.apiBase,
//       body: body,
//       method: "POST",
//     });
//   return { data, status, error, refresh };
// };

export const getArtworkHistoryDetailList = async (keys: string[]) => {
  const runtimeConfig = useRuntimeConfig();
  return await commoneFetch<GetArtworkHistoryDetailListRes>(
    `/api/wujie/batchGetDrawTaskInfo`,
    {
      method: "POST",
      body: keys,
      baseURL: runtimeConfig.public.apiBase,
    }
  );
};

export const getDrawTaskKeys = async (page: number, size: number) => {
  const runtimeConfig = useRuntimeConfig();
  return await commoneFetch<GetBatchDrawTaskKeysRes>(
    `/api/wujie/batchGetDrawTaskInfoByUser`,
    {
      method: "POST",
      body: {
        page,
        size
      },
      baseURL: runtimeConfig.public.apiBase,
    }
  );
}

export const batchGetDrawTasksDetailByKeys = async (keys: string[]) => {
  const runtimeConfig = useRuntimeConfig();
  return await commoneFetch<GetBatchDrawTaskDetailsRes>(
    `/api/wujie/batchGetDrawTaskInfoByKeys`,
    {
      method: "POST",
      body: keys,
      baseURL: runtimeConfig.public.apiBase,
    }
  );
}