import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Radio, Upload, Icon, Modal } from 'antd'
import { APIPATH } from '../constants'

const { TextArea } = Input
const FormItem = Form.Item

class MessageEditor extends React.Component {
  state = {
    contentType: 1, // 1: text , 2: file
    textContent: '',
    previewVisible: false,
    previewImage: '',
    fileList: []
  }

  handleSend = () => {
    const { selectedGroups, user } = this.props
    const { contentType, textContent, fileList } = this.state

    const payload = {
      groups: selectedGroups,
      type: contentType,
      content: contentType === 1 ? textContent : fileList[0].response,
      user: user.payload.name
    }

    this.props.dispatch({ type: 'message/massMessage', payload })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleFileChange = ({ fileList }) => {
    this.setState({ fileList })
  }

  handleContentTypeChange = e => {
    this.setState({ contentType: e.target.value })
  }

  onChangeTextContent = e => {
    this.setState({ textContent: e.target.value })
  }

  changeEditor = type => {
    if (type === 1) {
      return (
        <FormItem label='内容'>
          <TextArea
            placeholder='请输入要发送的内容'
            autosize={{ minRows: 2, maxRows: 6 }}
            onChange={this.onChangeTextContent}
            value={this.state.textContent}
          />
        </FormItem>
      )
    } else {
      const { previewVisible, previewImage, fileList } = this.state
      const uploadButton = (
        <div>
          <Icon type='plus' />
          <div className='ant-upload-text'>Upload</div>
        </div>
      )
      return (
        <FormItem label='文件（图片）'>
          <div className='clearfix'>
            <Upload
              action={`${APIPATH}/upload`}
              listType='picture-card'
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleFileChange}
              accept='image/gif,image/jpeg,image/jpg,image/png,image/svg'
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </FormItem>
      )
    }
  }

  render() {
    const { selectedGroups, isSending, isLogin } = this.props
    const { contentType, textContent, fileList } = this.state
    if (!isLogin) return null
    if (selectedGroups.length) {
      return (
        <div style={{ marginTop: '60px' }}>
          <Form layout='vertical'>
            <FormItem label='内容类型'>
              <Radio.Group
                defaultValue={contentType}
                onChange={this.handleContentTypeChange}
              >
                <Radio.Button value={1}>文本</Radio.Button>
                <Radio.Button value={2}>文件（图片）</Radio.Button>
              </Radio.Group>
            </FormItem>
            {this.changeEditor(contentType)}
            <FormItem>
              <Button
                loading={isSending}
                onClick={this.handleSend}
                type='primary'
                disabled={
                  (contentType === 1 && textContent === '') ||
                  (contentType === 2 &&
                    (fileList.length === 0 || fileList[0].status !== 'done'))
                }
              >
                发送
              </Button>
            </FormItem>
          </Form>
        </div>
      )
    }
    return null
  }
}

function mapStateToProps({ group, message, user }) {
  return {
    selectedGroups: group.selectedGroups,
    isSending: message.isSending,
    isLogin: user.isLogin,
    user: user.info
  }
}

export default connect(mapStateToProps)(MessageEditor)
