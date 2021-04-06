import PaneLayout from "@components/Core/UI/Layout/SplitPane/Pane"
import SplitPaneLayout from "@components/Core/UI/Layout/SplitPane"
import { MdCancel, MdMoreVert } from "react-icons/md"
import styles from "./Pane.module.scss"
import { createState } from "@components/Core/Util/State"
import Button from "../Button"
import Strip from "../Button/Strip"
import Tooltip from "../Tooltip"

export default function Pane({ children, visible = true, ...props }) {
    const state = Pane.State.useState({ visible });
    const { orientation } = SplitPaneLayout.State.useState();
    const onClose = () => {
        state.visible = false;
    };
    return !!state.visible && <PaneLayout {...props}>
        {children}
        <Strip classes={{ root: styles.strip }}>
            <Tooltip title="Close">
                <Button onClick={onClose}>
                    <MdCancel />
                </Button>
            </Tooltip>
            <Button>
                {orientation === "vertical" && <MdMoreVert />}
                {orientation === "horizontal" && <MdMoreHoriz />}
            </Button>
        </Strip>
    </PaneLayout>;
}

Pane.State = createState();
