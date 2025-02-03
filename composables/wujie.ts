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
  GetGlobalDrawTaskDetailsRes,
  GetDrawDetailByKeyRes,
  GetDrawTaskInfoRes,
  Action,
  BaseRes,
  GetDrawCommentListRes
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

export const batchGetFinishedDrawInfoByUser = async (userId: number, page: number, size: number) => {
  return await commoneFetch<GetGlobalDrawTaskDetailsRes>(
    `/api/wujie/batchGetFinishedDrawInfoByUser`,
    {
      method: "POST",
      body: {
        userId,
        page,
        size
      },
    }
  );
}

export const batchGetCollectedDrawInfoByUser = async (userId: number, page: number, size: number) => {
  return await commoneFetch<GetGlobalDrawTaskDetailsRes>(
    `/api/wujie/batchGetCollectedDrawInfoByUser`,
    {
      method: "POST",
      body: {
        userId,
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

export const getDrawDetailByKey = async (key: string) => {
  return await commoneFetch<GetDrawDetailByKeyRes>(
    `/api/wujie/getFinishedDrawDetailInfo`,
    {
      method: "POST",
      body: { key }
    }
  );
}

export const getDrawTaskInfo = async (key: string) => {
  return await commoneFetch<GetDrawTaskInfoRes>(
    `/api/wujie/getDrawTaskInfo?key=${key}`,
    {
      method: "GET",
    }
  );
}

export const followUser = async (action: Action) => {
  return await commoneFetch<BaseRes>(`/api/action/follow`, {
    method: "POST",
    body: action,
  });
}

export const unfollowUser = async (action: Action) => {
  return await commoneFetch<BaseRes>(`/api/action/unfollow`, {
    method: "POST",
    body: action,
  });
}

export const likeDraw = async (action: Action) => {
  return await commoneFetch<BaseRes>(`/api/action/like`, {
    method: "POST",
    body: action,
  });
}

export const dislikeDraw = async (action: Action) => {
  return await commoneFetch<BaseRes>(`/api/action/dislike`, {
    method: "POST",
    body: action,
  });
}

export const collectDraw = async (action: Action) => {
  return await commoneFetch<BaseRes>(`/api/action/collect`, {
    method: "POST",
    body: action,
  });
}

export const uncollectDraw = async (action: Action) => {
  return await commoneFetch<BaseRes>(`/api/action/uncollect`, {
    method: "POST",
    body: action,
  });
}

export const commentDraw = async (action: Action) => {
  return await commoneFetch<BaseRes>(`/api/action/comment`, {
    method: "POST",
    body: action,
  });
}

export const getDrawComments = async (drawId: number) => {
  return await commoneFetch<GetDrawCommentListRes>(`/api/wujie/getDrawCommentList`, {
    method: "POST",
    body: { id: drawId }
  });
}