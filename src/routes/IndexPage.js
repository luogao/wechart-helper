import React from 'react'
import { connect } from 'dva'
import styles from './IndexPage.css'
import GroupList from '../components/GroupList'
import MessageEditor from '../components/MessageEditor'
import LoginWechat from '../components/LoginWechat'

function IndexPage() {
  return (
    <div className={styles.normal}>
      <GroupList />
      <MessageEditor />
      <LoginWechat />
    </div>
  )
}

IndexPage.propTypes = {}

export default connect()(IndexPage)
