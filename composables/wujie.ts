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
  GetBatchDrawTaskDetailsRes,
  GetGlobalDrawTaskDetailsRes
} from "../types";

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

  return await commoneFetch<AICreateResponse>(`/api/wujie/createWithDefaultAI`, {
    method: "POST",
    body: body,
  });
};

export const createAIByMJ = async (body: MJAICreateRequest) => {

  return await commoneFetch<AICreateResponse>(`/api/wujie/createWithMJ`, {
    method: "POST",
    body: body,
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
  return await commoneFetch<GetArtworkHistoryDetailListRes>(
    `/api/wujie/batchGetDrawTaskInfo`,
    {
      method: "POST",
      body: keys,
    }
  );
};

export const getDrawTaskKeys = async (page: number, size: number) => {
  return await commoneFetch<GetBatchDrawTaskKeysRes>(
    `/api/wujie/batchGetDrawTaskInfoByUser`,
    {
      method: "POST",
      body: {
        page,
        size
      },
    }
  );
}

export const getGlobalDrawTasks = async (page: number, size: number) => {
  return await commoneFetch<GetGlobalDrawTaskDetailsRes>(
    `/api/wujie/batchGetGlobalFinishedDrawInfo`,
    {
      method: "POST",
      body: {
        page,
        size
      },
    }
  );
}

export const batchGetDrawTasksDetailByKeys = async (keys: string[]) => {
  return await commoneFetch<GetBatchDrawTaskDetailsRes>(
    `/api/wujie/batchGetDrawTaskInfoByKeys`,
    {
      method: "POST",
      body: keys,
    }
  );
}

