import PaneLayout from "@components/Core/Layout/SplitPane/Pane"
import { MdCancel } from "react-icons/md"
import styles from "./Pane.module.scss"
import { createState } from "@components/Core/Util/State"
import { useState } from "react"

export default function Pane({ children, visible = true, ...props }) {
    const [isVisible, setVisible] = useState(visible);
    const onClose = () => {
        setVisible(false);
    };
    return !!isVisible && <PaneLayout {...props}>
        {children}
        <MdCancel className={styles.root} onClick={onClose} />
    </PaneLayout>;
}

Pane.State = createState({ visible: true });
