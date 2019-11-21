import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const MermaidBasic = dynamic(
  import('../components/mermaid/'),
  { ssr: false }
)

const Mermaid = () => {
  return (
    <div>
      <Head>
        <title>Mermaid Basic</title>
        <link rel='icon' href='/favicon.ico' />
        <script type="text/javascript" src="/mermaid.min.js"></script>
        <link href="/mermaid.css" rel="stylesheet" />
      </Head>
      <MermaidBasic></MermaidBasic>
    </div>
  )
}

export default Mermaid
