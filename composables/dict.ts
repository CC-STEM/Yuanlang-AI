import { defineStore } from "pinia";
import type { QueryDictMapRes, DictState } from '../types'

export const useDictStore = defineStore("dict-store", () => {
  const dictMap = ref<DictState | null>(null);
  const fetchDictMap = async () => {
    const { data } = await commoneFetch<QueryDictMapRes>(
      `/api/dictData/dictMap`,
      {
        method: "GET",
      }
    );
    dictMap.value = data;
    console.log('dictMap', dictMap)
  }

  fetchDictMap()
  return {
    dictMap
  }
})
