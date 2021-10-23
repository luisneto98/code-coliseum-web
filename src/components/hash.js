import { Col, Row } from "antd"
import React from 'react'


type hashParams = {
  hash: [[String, String, String],
    [String, String, String],
    [String, String, String]
  ],
  size: Number,
  tagOne: String,
  tagTwo: String,
  tagOneColor: String,
  tagTwoColor: String,
}


export default function Hash({ hash = [], size = 50, tagOne, tagTwo, tagOneColor, tagTwoColor }: hashParams) {

  return (
    <Col span={8}>
      {hash.map(line => {
        return (
          <Row style={{ height: size }}>
            {line.map(col => {
              const backgroundColor: string = col === tagOne ? tagOneColor : col === tagTwo ? tagTwoColor : null;
              return (
              <Col style={{ borderWidth: 2, borderColor: '#000', borderStyle: 'solid', backgroundColor }} span={8}>
                <Row justify='center' align='middle' style={{ height: '100%' }}>
                  {col}
                </Row>
              </Col>)
            })}
          </Row>
        )
      })}
    </Col>
  )
}