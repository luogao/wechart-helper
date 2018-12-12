import * as request from '../services'
import { notify } from '../utils'

const defaultState = {
  list: [],
  selectedGroups: []
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
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const res = yield call(request.getGroupList, payload)
        const listData = {
          list: res.data.data.data
        }
        yield put({ type: 'setData', payload: listData })
        notify('success', '群列表获取成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
