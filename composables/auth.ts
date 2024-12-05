import { defineStore } from 'pinia'

import { getToken, removeToken, setToken } from './helper'

interface AuthState {
  token?: string;
  loginDialog: boolean;
  userInfo: any;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    loginDialog: false,
    userInfo: {},
  }),

  getters: {
    isLogin: (state: AuthState) => !!state.token,
  },

  actions: {
    async getUserInfo(): Promise<any> {
      // try {
      //   const res = await fetchGetInfo()
      //   if (!res)
      //     return Promise.resolve(res)
      //   const { data } = res
      //   const { userInfo, userBalance } = data
      //   this.userInfo = { ...userInfo }
      //   this.userBalance = { ...userBalance }
      //   return Promise.resolve(data)
      // }
      // catch (error) {
      //   return Promise.reject(error)
      // }
    },

    // updateUserBanance(userBalance: UserBalance) {
    //   this.userBalance = userBalance
    // },

    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },

    setLoginDialog(bool: boolean) {
      this.loginDialog = bool
    },

    logOut() {
      this.token = undefined
      removeToken()
      this.userInfo = {}
      ElMessage.success('登出账户成功！')
    },

    updatePasswordSuccess() {
      this.token = undefined
      removeToken()
      this.userInfo = {}
      this.loginDialog = true
    },
  },
})
