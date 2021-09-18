import styles from "./Sidebar.module.scss"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import SplitPaneLayout from "@components/Core/UI/Layout/SplitPane"
import { createState } from "@components/Core/Util/State"
import { useCallback, useEffect } from "react"
import { useLocation } from "@components/Core/Util/Location"
import Layout from "@components/Core/Util/Layout"
import { createStorageHandler } from "@components/Core/Storage/Local"
import clsx from "clsx"

const storageHandler = createStorageHandler(["visible"]);

export default function ItemPanel() {
    const layout = Layout.useLayout();
    const location = useLocation();
    const itemPanelState = ItemPanel.State.useState();
    const visibleChanged = useCallback(visible => {
        if (typeof itemPanelState.visible !== "undefined") {
            itemPanelState.animate = true;
        }
        itemPanelState.visible = visible;
    }, [itemPanelState]);
    const draggingChanged = useCallback(dragging => {
        itemPanelState.animate = !dragging;
    }, [itemPanelState]);
    const isPopup = layout === "mobile";
    useEffect(() => {
        itemPanelState.selected = location;
    }, [location, itemPanelState]);
    const paneClasses = { root: clsx(styles.root, itemPanelState.animate && styles.animate), pane: styles.pane, divider: styles.divider };
    return <Pane.State visible={itemPanelState?.visible}>
        <Pane.State.Notify visible={visibleChanged} />
        <Pane.State.Storage id="ItemPanel" {...storageHandler} />
        <SplitPaneLayout.Resize.State.Notify dragging={draggingChanged} />
        <Pane classes={paneClasses} minSize={250} maxSize={500} size="20em">

        </Pane>
    </Pane.State>;
}

ItemPanel.State = createState({});