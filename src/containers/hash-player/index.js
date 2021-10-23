import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import player, {
  saveGameLog
} from '../../modules/player'
import { bindActionCreators } from 'redux'
import { Col, Modal, Row, Typography } from 'antd'
import { map } from 'bluebird'
import { each } from 'bluebird'
import { isEmpty } from '../../utils'
import Hash from '../../components/hash'
import History from '../../components/history'

const { Title } = Typography;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const default_gamelog = {
  ['1']: {
    turns: {
      "0": { "turn": 0, "player": "1", "move": "4" },
      "1": { "turn": 1, "player": "2", "move": "5" },
      "2": { "turn": 2, "player": "1", "move": "6" },
      "3": { "turn": 3, "player": "2", "move": "7" },
      "4": { "turn": 4, "player": "1", "move": "2" },
      "5": { "turn": 5, "player": "2", "move": "1" },
      "6": { "turn": 6, "player": "1", "move": "3" },
      "7": { "turn": 7, "player": "2", "move": "8" },
      "8": { "turn": 8, "player": "1", "move": "9" }
    },
    victory: '2'
  },
  ['2']: {
    turns: {
      "0": { "turn": 0, "player": "1", "move": "4" },
      "1": { "turn": 1, "player": "2", "move": "5" },
      "2": { "turn": 2, "player": "1", "move": "6" },
      "3": { "turn": 3, "player": "2", "move": "7" },
      "4": { "turn": 4, "player": "1", "move": "2" },
      "5": { "turn": 5, "player": "2", "move": "1" },
      "6": { "turn": 6, "player": "1", "move": "3" },
      "7": { "turn": 7, "player": "2", "move": "8" },
      "8": { "turn": 8, "player": "1", "move": "9" }
    },
    victory: '2'
  },
  victory: null
};

const POSI_MAP = {
  "1": { i: 0, j: 0 },
  "2": { i: 0, j: 1 },
  "3": { i: 0, j: 2 },
  "4": { i: 1, j: 0 },
  "5": { i: 1, j: 1 },
  "6": { i: 1, j: 2 },
  "7": { i: 2, j: 0 },
  "8": { i: 2, j: 1 },
  "9": { i: 2, j: 2 },
};

const getHashDefault = () => ([['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]);
const TAG_ONE = 'X';
const TAG_TWO = 'O';

const HashPlayer = (props) => {
  // let gameLog = default_gamelog;
  const [hash, setHash] = useState(getHashDefault());
  const [history, setHistory] = useState([]);
  const [gameNumber, setGameNumber] = useState(1);
  const [code1Score, setCode1Score] = useState(0);
  const [code2Score, setCode2Score] = useState(0);

  // if (!isEmpty(props.gameLog))
  const { gameLog } = props

  function infoRoundWinner(codeWinner) {
    let secondsToGo = 5;
    const modal = Modal.info({
      title: `Final da partida ${gameNumber}`,
      content: `O ganhador dessa partida foi o ${codeWinner}`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function infoGameWinner(codeWinner) {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: `Final do confronto`,
      content: codeWinner ? `O ganhador desse confronto foi o ${codeWinner}` : 'O resultado da partida foi empate!',
    });
  }

  const runConfrontation = useCallback(async () => {
    const game = gameLog[gameNumber];
    await runGame(game.turns, gameNumber);
    
    if(game.victory === '1') {
      infoRoundWinner('Código 1');
      setCode1Score(code1Score + 1);
    } else{
      infoRoundWinner('Código 2');
      setCode2Score(code2Score + 1);
    }
    await delay(5000);

    if (gameNumber == 1) {
      setHash(getHashDefault());
      setGameNumber(2);
    } else {
      infoGameWinner(gameLog.victory == '1' ? 'Código 1' : gameLog.victory == '2' ? 'Código 2' : null);
    }

  }, [hash, gameNumber])

  const runGame = useCallback(async (game, gameNumber) => {
    await each(Object.keys(game).sort(), async (key) => {
      await delay(2000);
      const { player, turn, move }: { player: '1' | '2', turn: Number, move: string } = game[key]

      hash[POSI_MAP[move].i][POSI_MAP[move].j] = player == '1' ? TAG_ONE : TAG_TWO
      setHash([...hash])

      history.unshift({ turn: turn + 1, move, gameNumber, player: player === '1' ? 'Código 1' : 'Código 2' })
      setHistory([...history])

    }, { concurrency: 1 })
  }, [hash, history, gameNumber])

  useEffect(() => {
    if(!isEmpty(gameLog))
      runConfrontation();
  }, [gameNumber])

  return (
    <>
      <Col span={24}>
        <Row>
          <Col span={12} style={{ marginTop: 20 }}>
            <Row justify='center'>
              <Title level={2} > Código 1 (X) </ Title>
            </Row>
            <Row justify='center'>
              <Title level={3} >{code1Score}</ Title>
            </Row>
          </Col>
          <Col span={12} style={{ marginTop: 20 }}>
            <Row justify='center'>
              <Title level={2} > Código 2 (O) </ Title>
            </Row>
            <Row justify='center'>
              <Title level={3} >{code2Score}</ Title>
            </Row>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={16} style={{ marginTop: 20 }}>
            <Row justify='center'>
              <Title># Jogo da Velha</Title>
            </Row>
            <Row justify='center'>
              <Hash
                hash={hash}
                tagOne={TAG_ONE}
                tagTwo={TAG_TWO}
                tagOneColor="#87CEFA"
                tagTwoColor="#FF7F50"
              />
            </Row>
            <Row justify='center' style={{ margin: 20 }}>
              <Title level={2}>Histórico</Title>
            </Row>
            <Row justify='center'>
              <History
                history={history}
              />
            </Row>
          </Col>
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
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HashPlayer)
