import React, { useState } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  saveGameLog
} from '../../modules/player'
import { Button, Col, Row, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Content } from 'antd/lib/layout/layout'
import { withRouter } from 'react-router-dom'

const Home = props => {
  const [code1File, setCode1File] = useState()
  const [code2File, setCode2File] = useState()
  
  const runGame = async () => {
    const formData = new FormData();
    formData.append('code1', code1File);
    formData.append('code2', code2File);
    const { data: gameLog } = await axios.post(process.env.REACT_APP_API_URL + '/encounter', formData);
    props.saveGameLog(gameLog)
    props.history.push('/hash-player')
  }

  return (
    <Row justify='center' gutter={16} style={{ marginTop: 20 }}>
      <Col>
        <Upload
          accept=".py"
          name='code1'
          maxCount={1}
          beforeUpload={(file) => setCode1File(file)}
          customRequest={(options) => options.onSuccess()}
        >
          <Button icon={<UploadOutlined />}>Código jogador 1</Button>
        </Upload>
      </Col>
      <Col>
        <Upload
          accept=".py"
          name='code1'
          maxCount={1}
          beforeUpload={(file) => setCode2File(file)}
          customRequest={(options) => options.onSuccess()}
        >
          <Button icon={<UploadOutlined />}>Código jogador 2</Button>
        </Upload>
      </Col>
      <Col>
        <Button type='primary' onClick={runGame}>Jogar</Button>
      </Col>
    </Row>)
}

const mapStateToProps = ({ player }) => ({
  gameLog: player.gameLog,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveGameLog,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home))
