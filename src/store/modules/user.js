import api from '@/api'
import {
  storage,
  // cookie,
} from '@dwdjs/utils'

let userInfo = storage.get('userInfo') || {};

// const cookieKey = 'dwdus_sid';
function isLogin(data = {}) {
  // return !!cookie.get(cookieKey) || !!(data.token && data.id);
  return !!(data.token && data.id);
}

const user = {
  state: {
    userInfo: userInfo,
    logged: isLogin(userInfo),
    oauthInfo: {}, // 用于授权绑定
  },

  mutations: {
    // 全量更新
    SET_USERINFO: (state, data) => {
      state.userInfo = data;
      state.logged = isLogin(data);
      console.log('更新用户信息', data);
      api.setCommonParams({
        token: (data && data.token) || '',
        user_id: (data && data.id) || '',
      });
      storage.set('userInfo', data, 86400 * 30);
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_OAUTHID: (state, data = {}) => {
      state.oauthInfo = data;
    },
  },

  actions: {
    // usage
    // this.$store.dispatch('Login', {username: '', password: ''})
    //   .then(res => {})
    //   .catch(err => {})
    Login({ commit, state }, loginForm) {
      return new Promise((resolve, reject) => {
        api.login(
          {
            ...loginForm,
          },
          res => {
            const { data } = res;
            commit('SET_USERINFO', data);
            // 正常登陆，清空授权相关信息
            commit('SET_OAUTHID', {});
            // storage.set("userInfo", { ...state });
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(
          {},
          res => {
            const { data } = res;
            if (!data) {
              reject('error');
            }
            commit('SET_USERINFO', data);
            commit('SET_OAUTHID', {});
            resolve(res);
          },
          err => {
            reject(err);
            // 这里统一鉴权提示报错
            return true;
          }
        );
      });
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.logout(
          {},
          res => {
            commit('SET_USERINFO', '');
            // removeToken();
            resolve();
          },
          err => {
            reject(err);
          }
        );
      });
    },

    // 前端 登出
    FedLogout({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERINFO', {});
        // cookie.set(cookieKey, '');
        // removeToken();
        resolve();
      });
    },
  },
};

export default user;
