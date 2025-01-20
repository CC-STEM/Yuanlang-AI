import type { CreateGoodsOrderRes, CreateGoodsOrderReq, QueryGoodsOrderRes } from '../types'

export const createGoodsOrder = async (data: CreateGoodsOrderReq) => {
  return await commoneFetch<CreateGoodsOrderRes>(
    `/api/goodsOrder/createGoodsOrder`,
    {
      method: "POST",
      body: data,
    }
  );
}

export const queryGoodsOrderByNo = async (orderNo: string) => {
  return await commoneFetch<QueryGoodsOrderRes>(
    `/api/goodsOrder/queryGoodsOrderByNo?orderNo=${orderNo}`,
    {
      method: "GET",
    }
  );
}