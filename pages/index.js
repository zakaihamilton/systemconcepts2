import Head from 'next/head'
import Util from "@components/Core/Util"
import SplitPane from "@components/Core/UI/Widgets/SplitPane"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import Title from "@components/App/Title"
import Sidebar from "@components/App/Sidebar"
import Page from "@components/App/Page"

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
          <SplitPane>
            <Sidebar />
            <Page />
          </SplitPane>
        </Pane>
      </SplitPane>
    </Util>
  )
}
