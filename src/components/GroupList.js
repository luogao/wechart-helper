import React from 'react'
import { connect } from 'dva'
import { Select, Button } from 'antd'

class GroupList extends React.Component {
  state = {
    isLoading: false
  }

  _renderOptions = list => {
    return list.map(item => (
      <Select.Option key={item.id}>{item.name}</Select.Option>
    ))
  }

  handleChange(value) {
    const _nameValue = []
    this.props.list.forEach(_item => {
      value.forEach(val => {
        if (_item.id === val) {
          _nameValue.push(_item.name)
        }
      })
    })

    this.props.dispatch({
      type: 'group/selectGroup',
      payload: { selectedGroups: _nameValue }
    })
  }

  render() {
    const { list, selectedGroups, isLogin, user } = this.props
    if (!isLogin) return null
    return (
      <div>
        <p>请选择要发送的群聊</p>
        {list.length > 0 ? (
          <div>
            <Select
              mode='multiple'
              placeholder='Please select'
              style={{ width: '100%' }}
              onChange={this.handleChange.bind(this)}
              defaultValue={selectedGroups}
            >
              {this._renderOptions(list)}
            </Select>
          </div>
        ) : (
          <div>
            <Button
              loading={this.state.isLoading}
              disabled={!isLogin}
              onClick={() => {
                this.setState({ isLoading: true })
                this.props.dispatch({
                  type: 'group/fetch',
                  payload: { user: user.payload.name }
                })
              }}
            >
              获取群列表
            </Button>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ group, user }) {
  return {
    list: group.list,
    selectedGroups: group.selectedGroups,
    isLogin: user.isLogin,
    user: user.info,
    isReady: user.isReady
  }
}

export default connect(mapStateToProps)(GroupList)
