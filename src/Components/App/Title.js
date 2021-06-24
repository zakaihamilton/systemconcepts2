import Bar from "@components/Core/UI/Layout/Bar"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import styles from "./Title.module.scss"
import AppButton from "./Title/AppButton";

export default function Title() {
    return <Pane id="title" closable={false} size="3em" classes={styles}>
        <Bar className={styles.bar}>
            <AppButton />
            <div style={{ flex: 1 }} />
        </Bar>
    </Pane>;
}
