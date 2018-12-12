
const defaultState = {
  socket: null
}

export default {
  namespace: 'socket',

  state: defaultState,

  reducers: {
    init(state, { payload }) {
      state.socket = payload
      return { ...state }
    }
  },

  effects: {
    *setupSocket({ payload }, { call, put }) {
      const socket = io(SOCKETSERVER)

      yield put({ type: 'init', payload: socket })
    },
    *login({ payload }, { call, put, select }) {
      const socket = yield select(({ socket }) => socket.socket)
      socket.emit('login')
    },
    *handleScan({ payload }, { put }) {
      console.log(123)
      console.log(payload)
      yield put({ type: 'setQrcode', payload: { qrcode: payload } })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          // dispatch({ type: 'setupSocket' })
        }
      })
    }
  }
}
