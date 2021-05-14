import styles from "./Sidebar.module.scss"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { createState } from "@components/Core/Util/State"
import { useCallback } from "react"
import List from "@components/Core/UI/Layout/List"
import SidebarItem from "./Sidebar/Item"
import Size from "@components/Core/Util/Size"

export default function Sidebar() {
    const sidebarState = Sidebar.State.useState();
    const visibleChanged = useCallback(visible => sidebarState.visible = visible, [sidebarState]);
    const { width } = Size.useSize();
    return <Pane.State visible={sidebarState?.visible}>
        <Pane.State.Notify visible={visibleChanged} />
        <Pane classes={{ pane: styles.root }} divider={true} minSize={250} maxSize={width / 2} size="20em" style={{ backgroundColor: "lightgrey" }}>
            <List className={styles.list} itemSize={40} count={100} Item={SidebarItem}>

            </List>
        </Pane>
    </Pane.State>;
}

Sidebar.State = createState({ visible: true });
