import * as request from '../services'
import { notify } from '../utils'

const defaultState = {
  list: [],
  selectedGroups: [],
  isLoading: false
}
export default {
  namespace: 'group',

  state: defaultState,

  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload }
    },
    selectGroup(state, { payload }) {
      return { ...state, ...payload }
    },
    changeLoadingState(state, { payload }) {
      state.isLoading = payload
      return { ...state }
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        yield put({ type: 'changeLoadingState', payload: true })
        const res = yield call(request.getGroupList, payload)
        if (res.data.data.ret === -1) {
          notify('error', '群列表获取失败，' + res.data.data.msg)
          yield put({ type: 'user/clearUserInfo' })
          yield put({ type: 'changeLoadingState', payload: false })
          return
        }
        const listData = {
          list: res.data.data.data
        }
        yield put({ type: 'setData', payload: listData })
        yield put({ type: 'changeLoadingState', payload: false })
        notify('success', '群列表获取成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
