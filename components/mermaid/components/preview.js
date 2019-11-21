import React, { useEffect, useRef, useState } from 'react'
import { Divider, Card } from 'antd'
import moment from 'moment'
import { Base64 } from 'js-base64'

const Preview = ({code, config}) => {
  let container = useRef(null);
  let [isError, setIsError] = useState(false)
  let [errorMessage, setErrorMessage] = useState("")

  const onDownloadSVG = (event) => {
    event.target.href = `data:image/svg+xml;base64,${Base64.encode(
      container.innerHTML
    )}`
    event.target.download = `mermaid-diagram-${moment().format(
      'YYYYMMDDHHmmss'
    )}.svg`
  }

  const initMermaid = () => {
    try {
      mermaid.parse(code)
      let _code = code
      _code = _code.replace(/</g, '&lt;')
      _code = _code.replace(/>/g, '&gt;')
      container.innerHTML = _code
      mermaid.initialize(config)
      mermaid.init(container)
      setIsError(false)
    } catch (e) {
      setIsError(true)
      setErrorMessage(e.str)
    }
  }

  useEffect(() => {
    container.removeAttribute('data-processed')
    initMermaid()
  })

  return (
    <div>
      <Card title='Preview'>
        <div
          ref={div => {
            container = div
          }}
        >
          { !isError ? code : errorMessage }
        </div>
      </Card>
      <Card title='Actions'>
        <div className='links'>
          <Divider type='vertical' />
          <a href='' download='' onClick={onDownloadSVG}>
            Download SVG
          </a>
        </div>
      </Card>
    </div>
  )
}

export default Preview