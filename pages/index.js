import Head from 'next/head'
import Util from "@components/Core/Util"
import SplitPane from "@components/Core/UI/Widgets/SplitPane"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import Title from "src/Components/App/Title"

export default function App() {
  return (
    <Util>
      <Head>
        <title>System Concepts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SplitPane orientation="horizontal">
        <Title />
        <Pane id="main" closable={false} style={{ backgroundColor: "white" }}>
          <SplitPane insertable={true}>
            <Pane divider={true} size="20em" style={{ backgroundColor: "lightgrey" }}>

            </Pane>
            <Pane closable={false} divider={true} style={{ backgroundColor: "white" }}>

            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </Util>
  )
}
