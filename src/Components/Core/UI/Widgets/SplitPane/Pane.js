import PaneLayout from "@components/Core/UI/Layout/SplitPane/Pane"
import SplitPaneLayout from "@components/Core/UI/Layout/SplitPane"
import { MdCancel, MdMoreVert } from "react-icons/md"
import styles from "./Pane.module.scss"
import { createState } from "@components/Core/Util/State"
import Button from "../Button"

export default function Pane({ children, visible = true, ...props }) {
    const state = Pane.State.useState({ visible });
    const { orientation } = SplitPaneLayout.State.useState();
    const onClose = () => {
        state.visible = false;
    };
    return !!state.visible && <PaneLayout {...props}>
        {children}
        <div className={styles.buttons}>
            <Button classes={{ root: styles.button }}>
                <MdCancel onClick={onClose} />
            </Button>
            <Button classes={{ root: styles.button }}>
                {orientation === "vertical" && <MdMoreVert />}
                {orientation === "horizontal" && <MdMoreHoriz />}
            </Button>
        </div>
    </PaneLayout>;
}

Pane.State = createState();
