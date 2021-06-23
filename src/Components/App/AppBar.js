import Bar from "@components/Core/UI/Layout/Bar"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import styles from "./AppBar.module.scss"
import Size from "@components/Core/Util/Size"

export default function AppBar() {
    const { height } = Size.useSize();
    return <Pane id="title" closable={false} divider={true} last={true} minSize={40} maxSize={120} size="4em" classes={styles}>
        <Bar className={styles.bar}>
            <div style={{ flex: 1 }} />
        </Bar>
    </Pane>;
}
