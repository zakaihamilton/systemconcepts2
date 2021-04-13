import Head from 'next/head'
import Util from "@components/Core/Util"
import SplitPane from "src/Components/Core/UI/Widgets/SplitPane"
import Pane from "src/Components/Core/UI/Widgets/SplitPane/Pane"

export default function App() {
  return (
    <Util>
      <Head>
        <title>System Concepts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplitPane orientation="horizontal">
        <Pane closable={false} divider={true} style={{ backgroundColor: "blue" }}>

        </Pane>
        <Pane closable={false} style={{ backgroundColor: "white" }}>
          <SplitPane insertable={true}>
            <Pane divider={true} style={{ backgroundColor: "red" }}>

            </Pane>
            <Pane divider={true} style={{ backgroundColor: "orange" }}>

            </Pane>
            <Pane divider={true} style={{ backgroundColor: "green" }}>

            </Pane>
            <Pane divider={true} style={{ backgroundColor: "yellow" }}>

            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </Util>
  )
}
