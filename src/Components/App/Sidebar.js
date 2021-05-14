import Pane from "@components/Core/UI/Widgets/SplitPane/Pane"
import { createState } from "@components/Core/Util/State";
import { useCallback } from "react";

export default function Sidebar() {
    const sidebarState = Sidebar.State.useState();
    const visibleChanged = useCallback(visible => sidebarState.visible = visible, [sidebarState]);
    return <Pane.State visible={sidebarState?.visible}>
        <Pane.State.Notify visible={visibleChanged} />
        <Pane divider={true} size="20em" style={{ backgroundColor: "lightgrey" }}>

        </Pane>
    </Pane.State>;
}

Sidebar.State = createState({ visible: true });
