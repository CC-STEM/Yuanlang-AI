import type { User, GetUserRes, BaseRes } from '@/types'

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
