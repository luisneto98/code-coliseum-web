import React, { useState } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  saveGameLog
} from '../../modules/player'
import { Button, Col, Row, Upload, Tooltip } from 'antd'
import { UploadOutlined, InfoCircleOutlined, DownloadOutlined } from '@ant-design/icons';
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
    <>
      <Col span={4}/>
      <Col span={16} style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column', height: '100%' }}>
          <Row justify='center' align='center' style={{ marginTop: 10 }}>
            <Upload
              accept=".py"
              name='code1'
              maxCount={1}
              beforeUpload={(file) => setCode1File(file)}
              customRequest={(options) => options.onSuccess()}
            >
              <Button icon={<UploadOutlined />}>Código jogador 1</Button>
            </Upload>
            <Col style={{ marginLeft: 10 }}>
              <Tooltip title="Adicione aqui o código que terá a lógica do jogador 1">
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Row justify='center' style={{ marginTop: 10 }}>
            <Upload
              accept=".py"
              name='code1'
              maxCount={1}
              beforeUpload={(file) => setCode2File(file)}
              customRequest={(options) => options.onSuccess()}
            >
              <Button icon={<UploadOutlined />}>Código jogador 2</Button>
            </Upload>
            <Col style={{ marginLeft: 10 }}>
              <Tooltip title="Adicione aqui o código que terá a lógica do jogador 2">
                <InfoCircleOutlined />
              </Tooltip>            </Col>
          </Row>
          <Row justify='center' style={{ marginTop: 10 }}>
            <Button type='primary' onClick={runGame}>Jogar</Button>
          </Row>
        </div>
      </Col>
      <Col span={4} >
        <Row justify={'end'} style={{ marginRight: 20, marginTop: 20 }}>
          <Button type='primary' shape={'round'} icon={<DownloadOutlined />} download href={'./../../../public/code2.py'}>Código de Exemplo</Button>
        </Row>
      </Col>
    </>
  )
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
