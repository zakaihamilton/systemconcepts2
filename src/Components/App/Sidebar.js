import styles from "./Sidebar.module.scss"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { createState } from "@components/Core/Util/State"
import { useCallback, useEffect } from "react"
import Tree, { treeMapper } from "@components/Core/UI/Layout/Tree"
import SidebarItem from "./Sidebar/Item"
import Size from "@components/Core/Util/Size"
import items from "./Sidebar/Items"
import { useLocation } from "@components/Core/Util/Location"

export default function Sidebar() {
    const location = useLocation();
    const sidebarState = Sidebar.State.useState();
    const visibleChanged = useCallback(visible => sidebarState.visible = visible, [sidebarState]);
    const { width } = Size.useSize();
    useEffect(() => {
        sidebarState.selected = location;
    }, [location]);
    const classes = { pane: styles.root, divider: styles.divider };
    return <Pane.State visible={sidebarState?.visible}>
        <Pane.State.Notify visible={visibleChanged} />
        <Pane classes={classes} divider={true} minSize={250} maxSize={width / 2} size="20em">
            <Tree className={styles.list} root={items} itemSize={40} mapper={treeMapper} Item={SidebarItem} />
        </Pane>
    </Pane.State>;
}

Sidebar.State = createState({ visible: true });
