import * as request from '../services'

const defaultState = {
  isLogin: false,
  isReady: false,
  qrcode: '',
  info: null
}

const LOCALSTORAGEKEY = 'WECHAT_HELPER_USER'

export default {
  namespace: 'user',

  state: defaultState,

  reducers: {
    login(state, { payload }) {
      state.isLogin = payload
      return { ...state }
    },
    setQrcode(state, { payload }) {
      return { ...state, ...payload }
    },
    setUser(state, { payload }) {
      return { ...state, ...payload }
    },
    setReady(state, { payload }) {
      state.isReady = payload
      return { ...state }
    }
  },

  effects: {
    *handleScan({ payload }, { put }) {
      yield put({ type: 'setQrcode', payload: { qrcode: payload } })
    },
    *loginSucceed({ payload }, { put }) {
      yield put({ type: 'login', payload: true })
      yield put({ type: 'setUser', payload: { info: payload } })
      localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(payload))
    },
    *checkLoginStatus({ payload }, { put }) {
      const user = localStorage.getItem(LOCALSTORAGEKEY)
      if (user) {
        yield put({ type: 'login', payload: true })
        yield put({ type: 'setUser', payload: { info: JSON.parse(user) } })
      }
    },
    *logout({ payload }, { call, put }) {
      yield call(request.logout, payload)
      yield put({ type: 'logoutSucceed' })
    },
    *logoutSucceed({ payload }, { put }) {
      localStorage.removeItem(LOCALSTORAGEKEY)
      yield put({ type: 'setQrcode', payload: { qrcode: '' } })
      yield put({ type: 'login', payload: false })
      yield put({ type: 'setUser', payload: { info: null } })
    },
    *botReady({ payload }, { put }) {
      yield put({ type: 'setReady', payload: true })
    },
    *updateSocket({ payload }, { call }) {
      yield call(request.updateSocket, payload)
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'checkLoginStatus' })
        }
      })
    }
  }
}
