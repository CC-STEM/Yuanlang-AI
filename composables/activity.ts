import type { QueryActivityRes } from '../types'


export const queryActivities = async () => {
  return await commoneFetch<QueryActivityRes>(
    `/api/activityConfig/queryActivityConfig`,
    {
      method: "POST",
      body: {},
    }
  );
}