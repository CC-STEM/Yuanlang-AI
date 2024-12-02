import type {
  GetModelInfoRes,
  GetModuleResourceInfoRes,
  AICreateRequest,
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

export const createAIByWujie = (data: AICreateRequest) => {
  // const { data: res, status, error } = useFetch<any>(
};
