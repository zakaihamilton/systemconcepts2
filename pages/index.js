import Head from 'next/head'
import SplitPane from "@components/Core/UI/Widgets/SplitPane"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import Title from "@components/App/Title"
import Sidebar from "@components/App/Sidebar"
import Page from "@components/App/Page"
import Languages from "@components/App/Languages"
import Translation from "@components/Core/Util/Translation"
import Language from "@components/Core/Util/Language"
import AppBar from "src/Components/App/AppBar"

export default function App() {
  return (
    <Language {...Languages.eng}>
      <Translation {...Languages}>
        <Head>
          <title>System Concepts</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SplitPane orientation="horizontal">
          <Title />
          <Pane id="main" closable={false}>
            <SplitPane>
              <Sidebar />
              <Page />
            </SplitPane>
          </Pane>
          <AppBar />
        </SplitPane>
      </Translation>
    </Language>
  );
}
