import { defineStore } from "pinia";
import type { GetSendCodeRes, User, AccountBalance } from "../types";

import { getToken, removeToken, setToken } from "./helper";

interface AuthState {
  token?: string;
  loginDialog: boolean;
  userInfo: User;
  accountBalance: AccountBalance;
}

export const useAuthStore = defineStore("auth-store", {
  state: (): AuthState => ({
    token: '',
    loginDialog: false,
    userInfo: {} as User,
    accountBalance: {} as AccountBalance
  }),

  getters: {
    isLogin: (state: AuthState) => !!(state.token || getToken()),
  },

  actions: {
    initializeToken() {
      if (import.meta.client) {
        this.token = getToken(); // 仅在客户端获取 token
        console.log('this.token', this.token)
      }
    },
    async getUserInfo(): Promise<any> {
      try {
        const res = await getUserInfo()
        if (!res)
          return Promise.resolve(res)
        const { data } = res
        const { userInfo, accountBalance } = data
        this.userInfo = { ...userInfo }
        this.accountBalance = { ...accountBalance }
        // this.userBalance = { ...userBalance }
        return Promise.resolve(data)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    // updateUserBanance(userBalance: UserBalance) {
    //   this.userBalance = userBalance
    // },

    setToken(token: string) {
      this.token = token;
      setToken(token);
    },

    removeToken() {
      this.token = undefined;
      removeToken();
    },

    setLoginDialog(bool: boolean) {
      this.loginDialog = bool;
    },

    logOut() {
      this.token = undefined;
      removeToken();
      this.userInfo = {};
      this.accountBalance = {}
      ElMessage.success("登出账户成功！");
    },

    updatePasswordSuccess() {
      this.token = undefined;
      removeToken();
      this.userInfo = {};
      this.accountBalance = {}
      this.loginDialog = true;
    },
  },
});

export const fetchPhoneCode = async (phone: string) => {
  const runtimeConfig = useRuntimeConfig();

  return await $fetch<GetSendCodeRes>(`/api/auth/sendPhoneCode`, {
    method: "POST",
    body: { phone },
    baseURL: runtimeConfig.public.apiBase,
  });
};

export const loginByPhoneCode = async (phone: string, code: string) => {
  const runtimeConfig = useRuntimeConfig();

  return await $fetch<any>(`/api/auth/loginByPhoneCode`, {
    method: "POST",
    body: { phone, code },
    baseURL: runtimeConfig.public.apiBase,
  });
};

export const loginByUserName = async (username: string, password: string) => {
  const runtimeConfig = useRuntimeConfig();

  return await $fetch<any>(`/api/auth/login`, {
    method: "POST",
    body: { username, password },
    baseURL: runtimeConfig.public.apiBase,
  });
}