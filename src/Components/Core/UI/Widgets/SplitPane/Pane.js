import PaneLayout from "@components/Core/UI/Layout/SplitPane/Pane"
import styles from "./Pane.module.scss"
import { createState } from "@components/Core/Util/State"
import Strip from "../Button/Strip"
import Close from "./Pane/Close"
import Menu from "./Pane/Menu"

export default function Pane({ children, closable = true, menu = true, visible = true, ...props }) {
    const state = Pane.State.useState({ visible });
    return !!state.visible && <PaneLayout {...props}>
        {children}
        <Strip classes={{ root: styles.strip }}>
            {!!closable && <Close />}
            {!!menu && <Menu menu={menu} />}
        </Strip>
    </PaneLayout>;
}

Pane.State = createState();
