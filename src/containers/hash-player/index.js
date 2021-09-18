import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import player, {
  saveGameLog
} from '../../modules/player'
import { bindActionCreators } from 'redux'
import { Row } from 'antd'
import { map } from 'bluebird'
import { each } from 'bluebird'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const CANVAS_WITDH = 2000
const CANVAS_HEIGHT = 1000

const HASH_START_X = 800
const HASH_END_X = 1200
const HASH_START_Y = 300
const HASH_END_Y = 700

const firstLinePosi = HASH_START_Y + ( HASH_END_Y - HASH_START_Y ) / 3
const secondLinePosi = HASH_END_Y - ( HASH_END_Y - HASH_START_Y ) / 3
const firstColPosi = HASH_START_X + ( HASH_END_X - HASH_START_X ) / 3
const secondColPosi = HASH_END_X - ( HASH_END_X - HASH_START_X ) / 3

const hashPosiToDrawMap = {
  '1': { x: (firstColPosi + HASH_START_X) / 2, y: firstLinePosi - 10 },
  '2': { x: (firstColPosi + secondColPosi) / 2, y: firstLinePosi - 10 },
  '3': { x: (secondColPosi + HASH_END_X) / 2, y: firstLinePosi - 10 },
  '4': { x: (firstColPosi + HASH_START_X) / 2, y: secondLinePosi - 10 },
  '5': { x: (firstColPosi + secondColPosi) / 2, y: secondLinePosi - 10 },
  '6': { x: (secondColPosi + HASH_END_X) / 2, y: secondLinePosi - 10 },
  '7': { x: (firstColPosi + HASH_START_X) / 2, y: HASH_END_Y - 10 },
  '8': { x: (firstColPosi + secondColPosi) / 2, y: HASH_END_Y - 10 },
  '9': { x: (secondColPosi + HASH_END_X) / 2, y: HASH_END_Y - 10 },
}


const HashPlayer = (props) => {
  const { gameLog = {} } = props
  const canvasRef = useRef(null)
  const drawHash = (ctx: CanvasRenderingContext2D) => {
    
    ctx.lineWidth = 10
    ctx.lineCap = 'round'

    // coluna esquerda
    ctx.moveTo(firstColPosi, HASH_START_Y);
    ctx.lineTo(firstColPosi, HASH_END_Y);
    // coluna direita
    ctx.moveTo(secondColPosi, HASH_START_Y);
    ctx.lineTo(secondColPosi, HASH_END_Y);
    // linha superior
    ctx.moveTo(HASH_START_X, firstLinePosi);
    ctx.lineTo(HASH_END_X, firstLinePosi);
    // linha inferior
    ctx.moveTo(HASH_START_X, secondLinePosi);
    ctx.lineTo(HASH_END_X, secondLinePosi);

    ctx.stroke()
  }

  const drawTextOnPosi = (ctx: CanvasRenderingContext2D, text: 'X' | 'O', posi: string) => {
    const fontSize = firstColPosi - HASH_START_X
    ctx.font = `${fontSize}px Comic Sans MS`
    ctx.textAlign = 'center'
    const posiObj = hashPosiToDrawMap[posi];
    ctx.fillText(text, posiObj.x, posiObj.y);
  }

  const drawScorePlayer1 = (ctx: CanvasRenderingContext2D, name: string, score: string, simbol: 'X' | 'O') => {
    ctx.font = `60px Comic Sans MS`
    ctx.textAlign = 'center'
    ctx.fillText(`${name} - (${simbol})`, CANVAS_WITDH * 0.25, CANVAS_HEIGHT * 0.1);
  }

  const drawScorePlayer2 = (ctx: CanvasRenderingContext2D, name: string, score: string, simbol: 'X' | 'O') => {
    ctx.font = `60px Comic Sans MS`
    ctx.textAlign = 'center'
    ctx.fillText(`${name} - (${simbol})`, CANVAS_WITDH * 0.75, CANVAS_HEIGHT * 0.1);
  }

  const runGame = async (ctx) => {
    each(Object.keys(gameLog).sort(), async (key) => { 
      await delay(2000);
      const { player, turn, move }: { player: '1' | '2', turn: Number, move: string } = gameLog[key]
      drawTextOnPosi(ctx, player == '1' ? 'X' : 'O', move)
    }, { concurrency: 1 })
    
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
    drawHash(ctx);
    drawScorePlayer1(ctx, 'Jogador 1', 0, 'X');
    drawScorePlayer2(ctx, 'Jogador 2', 0, 'O');
    runGame(ctx);
  })

  return (
    <Row justify='center'>
      <canvas ref={canvasRef} width={CANVAS_WITDH} height={CANVAS_HEIGHT} style={{background: 'fffaf8'}}>

      </canvas>
    </Row>
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
