import Head from 'next/head'
import Util from "@components/Core/Util"
import SplitPane from "@components/Core/Widgets/SplitPane"
import Pane from "@components/Core/Widgets/SplitPane/Pane"

export default function App() {
  return (
    <Util>
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
        <Pane divider={true} style={{ backgroundColor: "blue" }}>

        </Pane>
      </SplitPane>
    </Util>
  )
}
