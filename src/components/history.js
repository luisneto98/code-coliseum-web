import { Col, Row, Timeline, List, Typography } from "antd"
import React from 'react'


type historyParams = {
  history: {
    player: String,
    move: String,
    turn: String,
    gameNumber: String,
  }[],
}


export default function History({ history = [] }: historyParams) {

  return (
    <Col span={8}>
      <List
        bordered={true}
        dataSource={history}
        renderItem={({ player, move, turn, gameNumber }) => {
          return (
            <List.Item>
              Partida: {gameNumber} | Turno: {turn} | Jogador: {player} | Movimento: {move}
            </List.Item>
          )
        }}
      />
    </Col>
  )
}