export const getPackage = async () => {
  return await commoneFetch<any>(`testApi/internal/member/package/all`, {
    method: "GET",
  });
};

export const findByUserId = async () => {
  return await commoneFetch<any>(`testApi/internal/member/findByUserId`, {
    method: "GET",
  });
};

export const freeRegister = async () => {
  return await commoneFetch<any>(`testApi/internal/member/freeRegister`, {
    method: "GET",
  });
};

export const getWxPay = async (params: any) => {
  return await commoneFetch<any>(`internal/api/wxPay/native/pay`, {
    method: "POST",
    body: params,
  });
};

export const queryOrder = async (orderNo: any) => {
  return await commoneFetch<any>(
    `internal/api/wxPay/native/queryOrder/${orderNo}`,
    {
      method: "GET",
    }
  );
};

export const getAliPay = async (params: any) => {
  return await commoneFetch<any>(`internal/api/aliPay/native/pay`, {
    method: "POST",
    body: params,
  });
};

export const queryAliOrder = async (orderNo: any) => {
  return await commoneFetch<any>(
    `internal/api/aliPay/native/queryOrder/${orderNo}`,
    {
      method: "GET",
    }
  );
};