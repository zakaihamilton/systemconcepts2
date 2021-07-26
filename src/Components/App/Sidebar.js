import styles from "./Sidebar.module.scss"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import SplitPaneLayout from "@components/Core/UI/Layout/SplitPane"
import { createState } from "@components/Core/Util/State"
import { useCallback, useEffect } from "react"
import Tree, { treeMapper } from "@components/Core/UI/Layout/Tree"
import SidebarItem from "./Sidebar/Item"
import items from "./Sidebar/Items"
import { useLocation } from "@components/Core/Util/Location"
import Layout from "@components/Core/Util/Layout"
import { createStorageHandler } from "@components/Core/Storage/Local"
import clsx from "clsx"

const storageHandler = createStorageHandler(["visible"]);

export default function Sidebar() {
    const layout = Layout.useLayout();
    const location = useLocation();
    const sidebarState = Sidebar.State.useState();
    const visibleChanged = useCallback(visible => {
        if (typeof sidebarState.visible !== "undefined") {
            sidebarState.animate = true;
        }
        sidebarState.visible = visible;
    }, [sidebarState]);
    const draggingChanged = useCallback(dragging => {
        sidebarState.animate = !dragging;
    }, [sidebarState]);
    const isPopup = layout === "mobile";
    useEffect(() => {
        sidebarState.selected = location;
    }, [location, sidebarState]);
    const paneClasses = { root: clsx(styles.root, sidebarState.animate && styles.animate), pane: styles.pane, divider: styles.divider };
    return <Pane.State visible={sidebarState?.visible}>
        <Pane.State.Notify visible={visibleChanged} />
        <Pane.State.Storage id="Sidebar" {...storageHandler} />
        <SplitPaneLayout.Resize.State.Notify dragging={draggingChanged} />
        <Pane classes={paneClasses} closable={false} divider={!isPopup} minSize={250} maxSize={500} size="20em">
            <Tree className={styles.list} root={items} itemSize={40} mapper={treeMapper} Item={SidebarItem} />
        </Pane>
    </Pane.State>;
}

Sidebar.State = createState({});
