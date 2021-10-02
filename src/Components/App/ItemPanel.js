import styles from "./ItemPanel.module.scss"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import SplitPaneLayout from "@components/Core/UI/Layout/SplitPane"
import { createState } from "@components/Core/Util/State"
import { useCallback } from "react"
import Layout from "@components/Core/Util/Layout"
import { createStorageHandler } from "@components/Core/Storage/Local"
import Table from "@components/Core/UI/Widgets/Table"
import clsx from "clsx"

const storageHandler = createStorageHandler(["visible"]);

export default function ItemPanel() {
    const layout = Layout.useLayout();
    const itemPanelState = ItemPanel.State.useState();
    const tableState = Table.State.useState();
    const visibleChanged = useCallback(visible => {
        itemPanelState.animate = true;
        itemPanelState.visible = visible;
    }, [itemPanelState]);
    const draggingChanged = useCallback(dragging => {
        itemPanelState.animate = !dragging;
    }, [itemPanelState]);
    const isPopup = layout === "mobile";
    const paneClasses = { root: clsx(styles.root, itemPanelState.animate && styles.animate), pane: styles.pane, divider: styles.divider };
    const visible = !!(itemPanelState?.visible && tableState?.selected);
    return <Pane.State visible={visible}>
        <Pane.State.Notify visible={visibleChanged} />
        <Pane.State.Storage id="ItemPanel" {...storageHandler} />
        <SplitPaneLayout.Resize.State.Notify dragging={draggingChanged} />
        <Pane classes={paneClasses} last={true} divider={!isPopup} minSize={250} maxSize={500} size="30em">
            {itemPanelState.pane}
        </Pane>
    </Pane.State>;
}

ItemPanel.State = createState({});
