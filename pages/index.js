import Head from 'next/head'
import Util from "@components/Core/Util"
import Main from "@components/Core/Layout/Main"
import SplitPane from "@components/Core/Widgets/SplitPane"
import Pane from "@components/Core/Widgets/SplitPane/Pane"

export default function App() {
  return (
    <Util>
      <Main>
        <Head>
          <title>System Concepts</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SplitPane>
          <Pane divider={true} style={{ backgroundColor: "red" }}>

          </Pane>
          <Pane divider={true} style={{ backgroundColor: "orange" }}>

          </Pane>
          <Pane divider={true} style={{ backgroundColor: "green" }}>

          </Pane>
          <Pane style={{ backgroundColor: "blue" }}>

          </Pane>
        </SplitPane>
      </Main>
    </Util>
  )
}
