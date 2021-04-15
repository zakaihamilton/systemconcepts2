import Head from 'next/head'
import Util from "@components/Core/Util"
import SplitPane from "@components/Core/UI/Widgets/SplitPane"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import Title from "@components/Main/Title"

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
