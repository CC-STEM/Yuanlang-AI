import type {
  GetModelInfoRes,
  GetModuleResourceInfoRes,
  DefaultAICreateRequest,
  AICreateResponse,
  GetAiArtWorkHistoryResponse,
  GetArtworkHistoryListRequest,
  GetArtworkHistoryDetailListRes,
  MJAICreateRequest,
} from "../types";

export const getModelInfo = () => {
  const runtimeConfig = useRuntimeConfig();
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
  const runtimeConfig = useRuntimeConfig();

  const { data, status, error } = useFetch<GetModuleResourceInfoRes>(
    `/api/wujie/getResourseModule?model=${model}`,
    {
      baseURL: runtimeConfig.public.apiBase,
      pick: ["data"],
    }
  );
  return { data, status, error };
};

export const createAIByWujie = async (body: DefaultAICreateRequest) => {
  const runtimeConfig = useRuntimeConfig();

  return await $fetch<AICreateResponse>(`/api/wujie/createWithDefaultAI`, {
    method: "POST",
    body: body,
    baseURL: runtimeConfig.public.apiBase,
  });
};

export const createAIByMJ = async (body: MJAICreateRequest) => {
  const runtimeConfig = useRuntimeConfig();

  return await $fetch<AICreateResponse>(`/api/wujie/createWithMJ`, {
    method: "POST",
    body: body,
    baseURL: runtimeConfig.public.apiBase,
  });
};

export const getArtworkHistoryKeyList = (
  body: GetArtworkHistoryListRequest
) => {
  const runtimeConfig = useRuntimeConfig();

  const { data, status, error, refresh } =
    useFetch<GetAiArtWorkHistoryResponse>(`/api/wujie/getDrawList`, {
      baseURL: runtimeConfig.public.apiBase,
      body: body,
      method: "POST",
    });
  return { data, status, error, refresh };
};

export const getArtworkHistoryDetailList = async (keys: string[]) => {
  const runtimeConfig = useRuntimeConfig();
  return await $fetch<GetArtworkHistoryDetailListRes>(
    `/api/wujie/batchGetDrawTaskInfo`,
    {
      method: "POST",
      body: keys,
      baseURL: runtimeConfig.public.apiBase,
    }
  );
};
