import type { ApplyGoodsOrderAfterSaleRes, CompleteGoodsOrderRes, CancelGoodsOrderRes, CreateGoodsOrderRes, CreateGoodsOrderReq, QueryGoodsOrderRes, QueryGoodsOrderListRes } from '../types'

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

export const queryGoodsOrder = async (page: number, size: number) => {
  return await commoneFetch<QueryGoodsOrderListRes>(
    `/api/goodsOrder/queryGoodsOrder`,
    {
      method: "POST",
      body: {
        page,
        size
      }
    }
  );
}

export const cancelGoodsOrder = async (orderNo: string) => {
  return await commoneFetch<ApplyGoodsOrderAfterSaleRes>(
    `/api/goodsOrder/cancelOrder`,
    {
      method: "POST",
      body: {
        orderNo
      }
    }
  );
}

export const applyAfterSale = async (orderNo: string) => {
  return await commoneFetch<CancelGoodsOrderRes>(
    `/api/goodsOrder/applyAfterSale`,
    {
      method: "POST",
      body: {
        orderNo
      }
    }
  );
}

export const completeGoodsOrder = async (orderNo: string) => {
  return await commoneFetch<CompleteGoodsOrderRes>(
    `/api/goodsOrder/completeGoodsOrder`,
    {
      method: "POST",
      body: {
        orderNo
      }
    }
  );
}