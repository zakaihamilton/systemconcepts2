import PaneLayout from "@components/Core/Layout/SplitPane/Pane"
import { MdCancel } from "react-icons/md"
import styles from "./Pane.module.scss"
import { createState } from "@components/Core/Util/State"

export default function Pane({ children, visible = true, ...props }) {
    const state = Pane.State.useState({ visible });
    const onClose = () => {
        state.visible = false;
    };
    return !!state.visible && <PaneLayout {...props}>
        {children}
        <MdCancel className={styles.close} onClick={onClose} />
    </PaneLayout>;
}

Pane.State = createState();
