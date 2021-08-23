import styles from "./Popup.module.scss"
import Modal from "@components/Core/Util/Modal"

export default function Popup({ visible, children, onClick }) {
    return <Modal visible={visible}>
        <div className={styles.root} onClick={onClick}>
            {children}
        </div>
    </Modal>;
}
