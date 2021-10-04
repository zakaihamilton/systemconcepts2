import styles from "./Popup.module.scss"
import Modal from "@components/Core/Util/Modal"
import { createState } from "./State";

export default function Popup({ children }) {
    const state = Popup.State.useState();
    return <Modal visible={state?.visible || false}>
        {!!state?.onClick && <>
            <div className={styles.root} onClick={state?.onClick} />
            {children}
        </>}
        {!state?.onClick && children}
    </Modal>;
}

Popup.State = createState();
