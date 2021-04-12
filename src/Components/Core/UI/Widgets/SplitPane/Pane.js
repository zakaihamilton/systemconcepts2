import PaneLayout from "@components/Core/UI/Layout/SplitPane/Pane"
import SplitPaneLayout from "@components/Core/UI/Layout/SplitPane"
import { MdCancel, MdMoreVert } from "react-icons/md"
import styles from "./Pane.module.scss"
import { createState } from "@components/Core/Util/State"
import Button from "../Button"
import Strip from "../Button/Strip"
import Tooltip from "../Tooltip"
import Components from "@components/Core/UI/Util/Components"

export default function Pane({ children, closable = true, menu, visible = true, ...props }) {
    const state = Pane.State.useState({ visible });
    const { orientation } = SplitPaneLayout.State.useState();
    const onClose = () => {
        state.visible = false;
    };
    return !!state.visible && <PaneLayout {...props}>
        {children}
        <Strip classes={{ root: styles.strip }}>
            {!!closable && <Tooltip title="Close">
                <Button onClick={onClose}>
                    <MdCancel />
                </Button>
            </Tooltip>}
            {!!menu && <Components menu={menu}>
                <Button>
                    {orientation === "vertical" && <MdMoreVert />}
                    {orientation === "horizontal" && <MdMoreHoriz />}
                </Button>
            </Components>}
        </Strip>
    </PaneLayout>;
}

Pane.State = createState();
