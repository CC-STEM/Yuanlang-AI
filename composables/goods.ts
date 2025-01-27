import type { QueryGoodsRes } from '../types'

export const queryGoods = async (sellStatus: number) => {
  return await commoneFetch<QueryGoodsRes>(
    `/api/goods/queryGoods`,
    {
      method: "POST",
      body: { sellStatus },
    }
  );
}