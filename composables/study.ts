import type { QueryStudyResourceRes } from '../types'


export const queryStudyResources = async (level: number, category: number) => {
  return await commoneFetch<QueryStudyResourceRes>(
    `/api/studyResource/list`,
    {
      method: "POST",
      body: {
        level,
        category
      },
    }
  );
}