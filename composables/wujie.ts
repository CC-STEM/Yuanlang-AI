import type {
  GetModelInfoRes,
  GetModuleResourceInfoRes,
  AICreateRequest,
  AICreateResponse,
  GetAiArtWorkHistoryResponse,
  GetArtworkHistoryListRequest,
  GetArtworkHistoryDetailListRes
} from "../types";
const runtimeConfig = useRuntimeConfig();

export const getModelInfo = () => {
  const { data, status, error } = useFetch<GetModelInfoRes>(
    "/api/wujie/getModelInfo",
    {
      baseURL: runtimeConfig.public.apiBase,
      pick: ["data"],
    }
  );
  return { data, status, error };
};

export const getModuleResourceInfo = (model: number) => {
  if (!model) {
    return {};
  }
  const { data, status, error } = useFetch<GetModuleResourceInfoRes>(
    `/api/wujie/getResourseModule?model=${model}`,
    {
      baseURL: runtimeConfig.public.apiBase,
      pick: ["data"],
    }
  );
  return { data, status, error };
};

export const createAIByWujie = async (body: AICreateRequest) => {
  return await $fetch<AICreateResponse>(
    `/api/wujie/createWithDefaultAI`,
    {
      method: "POST",
      body: body,
      baseURL: runtimeConfig.public.apiBase,
    })
};

export const getArtworkHistoryKeyList = (body: GetArtworkHistoryListRequest) => {
  const { data, status, error, refresh } = useFetch<GetAiArtWorkHistoryResponse>(
    `/api/wujie/getDrawList`,
    {
      baseURL: runtimeConfig.public.apiBase,
      body: body,
      method: "POST",
    }
  )
  return { data, status, error, refresh };
}

export const getArtworkHistoryDetailList = async (keys: string[]) => {
  return await $fetch<GetArtworkHistoryDetailListRes>(
    `/api/wujie/batchGetDrawTaskInfo`,
    {
      method: "POST",
      body: keys,
      baseURL: runtimeConfig.public.apiBase,
    }
  )
}
