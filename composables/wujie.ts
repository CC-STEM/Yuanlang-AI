import type { GetModelInfoRes } from '../types'
const runtimeConfig = useRuntimeConfig()


export const getModelInfo = () => {
  const { data, status, error } = useFetch<GetModelInfoRes>('/api/wujie/getModelInfo', {
    baseURL: runtimeConfig.public.apiBase,
    pick: ['data']
  })
  return { data, status, error }
}

export const getModuleResourceInfo = (model: number) => {
  const { data, status, error } = useFetch<GetModelInfoRes>(`/api/wujie/getResourseModule?model=${model}`, {
    baseURL: runtimeConfig.public.apiBase,
    pick: ['data']
  })
  return { data, status, error }
}