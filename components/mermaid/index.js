import React, { useState } from 'react'
import { Row, Col, Input, Affix, Card, Divider } from 'antd'

import Preview from './components/preview'

let defaultCode = `graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhone]
C -->|Three| F[fa:fa-car Car]
`
let defaultMermaid = { theme: 'forest' }

const Mermaid = () => {
  let [tmpCode, setTmpCode] = useState(defaultCode)
  let [tmpConfig, setTmpConfig] = useState(defaultMermaid)

  const onKeyDown = (event) => {
    const keyCode = event.keyCode || event.which

    if (keyCode === 9) {
      event.preventDefault()
      const TAB_SIZE = 4
      document.execCommand('insertText', false, ' '.repeat(TAB_SIZE))
    }
  }
  
  return (
    <div>
      <h1>Mermaid Live Editor</h1>
      <Divider />
      <Row gutter={16}>
        <Col span={8}>
          <Affix>
            <Card title='Code'>
              <Input.TextArea
                autosize={{ minRows: 4, maxRows: 16 }}
                value={tmpCode}
                onChange={(event) => setTmpCode(event.target.value)}
                onKeyDown={onKeyDown}
              />
            </Card>
          </Affix>
          <Card title='Mermaid configuration'>
            <Input.TextArea
              autosize={{ minRows: 4, maxRows: 16 }}
              defaultValue={JSON.stringify(tmpConfig, null, 2)}
              onChange={(event) => setTmpConfig(JSON.parse(event.target.value))}
              onKeyDown={onKeyDown}
            />
          </Card>
        </Col>
        <Col span={16}>
          <Preview code={tmpCode} config={tmpConfig}/>
        </Col>
      </Row>
    </div>
  )
}

export default Mermaid