import * as request from '../services'
import { notify } from '../utils'

const defaultState = {
  isSending: false
}
export default {
  namespace: 'message',

  state: defaultState,

  reducers: {
    changeSendState(state, { payload }) {
      state.isSending = payload
      return { ...state }
    }
  },

  effects: {
    *massMessage({ payload }, { call, put }) {
      try {
        yield put({ type: 'changeSendState', payload: true })
        yield call(request.massMessage, payload)
        yield put({ type: 'changeSendState', payload: false })
        notify('success', '消息发送成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
