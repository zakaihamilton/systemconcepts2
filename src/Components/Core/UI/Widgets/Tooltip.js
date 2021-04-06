import { useRef } from "react";
import { useHover } from "@components/Core/UI/Util/Hover"
import { useRegion } from "@components/Core/UI/Util/Region"
import Modal from "@components/Core/UI/Util/Modal"
import styles from "./Tooltip.module.scss"
import { useTimer } from "@components/Core/UI/Util/Timer"

export default function Tooltip({ title, description, children }) {
    const hoverRef = useRef();
    const modalRef = useRef();
    const hover = useHover(hoverRef);
    const modalHover = useHover(modalRef);
    const region = useRegion(hoverRef);
    const tooltipVisible = useTimer(500, 1500, hover || modalHover);

    return <div ref={hoverRef} className={styles.root}>
        {children}
        <Modal visible={tooltipVisible}>
            <div className={styles.modal} ref={modalRef} style={{ left: region.left, top: region.top }}>
                <div className={styles.popup}>
                    {title}
                </div>
            </div>
        </Modal>
    </div>;
}
