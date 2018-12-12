import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import io from 'socket.io-client'
import { notify } from '../utils'
import { APIPATH } from '../constants'

const SOCKETSERVER = APIPATH

class LoginWechat extends React.Component {
  constructor(props) {
    super(props)
    this.socket = io(SOCKETSERVER)
  }

  componentDidMount() {
    this._setUpSocket()
  }

  state = {
    loading: false
  }

  _setUpSocket = () => {
    this.socket.on('connected', () => {
      console.log('connected')
      if (this.props.isLogin) {
        this.props.dispatch({
          type: 'user/updateSocket',
          payload: {
            socketId: this.socket.id,
            user: this.props.user.payload.name
          }
        })
      }
    })

    this.socket.on('disconnected', () => {
      console.log('disconnected')
    })

    this.socket.on('scan', qrcode => {
      console.log('scan', qrcode)
      this.props.dispatch({ type: 'user/handleScan', payload: qrcode })
    })

    this.socket.on('logout', () => {
      console.log('logout')
      this.props.dispatch({ type: 'user/logoutSucceed' })
      notify('info', '当前用户已退出')
    })

    this.socket.on('loginSucceed', user => {
      console.log(`${user.payload.name}登录成功`)
      this.props.dispatch({ type: 'user/loginSucceed', payload: user })
      this.setState({ loading: false })
      notify('success', '登录成功')
    })
  }

  handleClick = () => {
    console.log('waiting...')
    const socketId = this.socket.id
    this.socket.emit('login', socketId)
    this.setState({ loading: true })
  }

  handleLogout = () => {
    console.log('waiting...')
    const { user } = this.props
    this.props.dispatch({
      type: 'user/logout',
      payload: { user: user.payload.name }
    })
  }

  render() {
    const { qrcode, isLogin } = this.props
    return (
      <div style={{ textAlign: 'center' }}>
        {qrcode && !isLogin ? (
          <div>
            <p>请扫描下方二维码登录微信</p>
            <img
              src={qrcode}
              alt=''
              width='300'
              height='300'
              onError={() => {
                this.props.dispatch({
                  type: 'setQrcode',
                  payload: { qrcode: '' }
                })
              }}
              onLoad={() => {
                notify('info', '二维码生成成功，请扫码登录')
              }}
            />
            <p style={{ marginTop: 15 }}>扫码后，请耐心等待一会儿哦～</p>
          </div>
        ) : (
          <div>
            {isLogin ? (
              <div style={{ textAlign: 'right', marginTop: 30 }}>
                <Button type='danger' onClick={this.handleLogout}>
                  退出登录
                </Button>
                {/* <Button>如果退出登录没有反应，请点这个</Button> */}
              </div>
            ) : (
              <div>
                <p>请点击登录按钮，获取二维码</p>
                <Button loading={this.state.loading} onClick={this.handleClick}>
                  登录
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ user }) {
  return {
    qrcode: user.qrcode,
    isLogin: user.isLogin,
    user: user.info,
    isReady: user.isReady
  }
}

export default connect(mapStateToProps)(LoginWechat)
