import type { User, GetUserRes, BaseRes, GetUserDetailRes } from '@/types'

// export const useUser = () => {
//   return ref()
// }

export const getUserInfo = async () => {
  return await commoneFetch<GetUserRes>(`/api/auth/getInfoNew`, {
    method: "GET",
  });
}

export const updateUserInfo = async (data: User) => {
  return await commoneFetch<BaseRes>(`/api/user/update`, {
    method: "POST",
    body: data,
  });
}

export const getUserDetail = async (userId: number) => {
  return await commoneFetch<GetUserDetailRes>(`/api/user/queryUserDetail`, {
    method: "POST",
    body: { userId },
  });
}


