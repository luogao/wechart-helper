import request from '../utils/request'
import { APIPATH } from '../constants'

export function getGroupList(data) {
  return request(`${APIPATH}/groupList`, {
    method: 'POST',
    data
  })
}

export function logout(data) {
  return request(`${APIPATH}/logout`, {
    method: 'POST',
    data
  })
}

export function massMessage(data) {
  return request(`${APIPATH}/massMessage`, {
    method: 'POST',
    data
  })
}

export function updateSocket(data) {
  return request(`${APIPATH}/updateSocket`, {
    method: 'POST',
    data
  })
}
