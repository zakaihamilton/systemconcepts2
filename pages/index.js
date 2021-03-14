import Head from 'next/head'
import Util from "@components/Core/Util"
import Main from "@components/Core/Layout/Main"
import SplitPane, { Pane, Divider } from "@components/Core/Layout/SplitPane"

export default function App() {
  return (
    <Util>
      <Main>
        <Head>
          <title>System Concepts</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SplitPane>
          <Pane style={{ backgroundColor: "red" }}>

          </Pane>
          <Divider />
          <Pane style={{ backgroundColor: "green" }}>

          </Pane>
        </SplitPane>
      </Main>
    </Util>
  )
}
