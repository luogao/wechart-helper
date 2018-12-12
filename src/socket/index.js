import io from 'socket.io-client'

const SOCKETSERVER = 'http://localhost:3000'

class WechatIo {
  constructor(options) {
    const socket = io(SOCKETSERVER)
    this.socket = socket
  }
}

export default WechatIo
