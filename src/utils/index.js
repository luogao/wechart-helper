import { message } from 'antd'

export const notify = (type, content) => {
  return message[type](content)
}
