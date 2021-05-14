import Bar from "@components/Core/UI/Layout/Bar"
import SettingsButton from "./Title/SettingsButton"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import styles from "./Title.module.scss"
import AppButton from "./Title/AppButton";

export default function Title() {
    return <Pane id="title" closable={false} divider={true} size="4em" classes={styles}>
        <Bar style={{ paddingRight: "1em" }}>
            <AppButton />
            <div style={{ flex: 1 }} />
            <SettingsButton />
        </Bar>
    </Pane>;
}
