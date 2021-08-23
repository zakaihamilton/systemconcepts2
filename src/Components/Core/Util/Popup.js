import styles from "./Popup.module.scss"
import Modal from "@components/Core/Util/Modal"
import { createState } from "./State";

export default function Popup({ visible, children, onClick }) {
    return <Modal visible={visible}>
        {!!onClick && <>
            <div className={styles.root} onClick={onClick} />
            <Popup.State onClick={onClick}>
                {children}
            </Popup.State>
        </>}
        {!onClick && children}
    </Modal>;
}

Popup.State = createState();
