import styles from "./Sidebar.module.scss"
import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { createState } from "@components/Core/Util/State"
import { useCallback } from "react"
import Tree, { treeMapper } from "@components/Core/UI/Layout/Tree"
import SidebarItem from "./Sidebar/Item"
import Size from "@components/Core/Util/Size"

const root = {
    name: "root",
    children: [
        {
            name: "this",
            children: [
                {
                    name: "is",
                    open: false,
                    children: [
                        {
                            name: "1"
                        },
                        {
                            name: "2"
                        }
                    ]
                },
                {
                    name: "an"
                },
                {
                    name: "example"
                }
            ]
        }
    ]
};

export default function Sidebar() {
    const sidebarState = Sidebar.State.useState();
    const visibleChanged = useCallback(visible => sidebarState.visible = visible, [sidebarState]);
    const { width } = Size.useSize();
    return <Pane.State visible={sidebarState?.visible}>
        <Pane.State.Notify visible={visibleChanged} />
        <Pane classes={{ pane: styles.root }} divider={true} minSize={250} maxSize={width / 2} size="20em" style={{ backgroundColor: "lightgrey" }}>
            <Tree className={styles.list} root={root} itemSize={40} mapper={treeMapper} Item={SidebarItem} />
        </Pane>
    </Pane.State>;
}

Sidebar.State = createState({ visible: true });
