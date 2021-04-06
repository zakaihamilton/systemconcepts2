import { useEffect, useRef, useState } from "react";
import { useHover } from "@components/Core/UI/Util/Hover"
import { useRegion } from "@components/Core/UI/Util/Region"
import Modal from "@components/Core/UI/Util/Modal"
import styles from "./Tooltip.module.scss"
import { useTimer } from "@components/Core/UI/Util/Timer"
import clsx from "clsx"

export default function Tooltip({ title, description, children }) {
    const hoverRef = useRef();
    const modalRef = useRef();
    const hover = useHover(hoverRef);
    const modalHover = useHover(modalRef);
    const hoverRegion = useRegion(hoverRef);
    const modalRegion = useRegion(modalRef);
    const tooltipMounted = useTimer(250, 1000, hover || modalHover);
    const tooltipVisible = useTimer(500, 500, hover || modalHover);
    let [initialPos, setInitialPos] = useState({ left: 0, top: 0 });
    useEffect(() => {
        setInitialPos({ left: hoverRegion.left + (hoverRegion.width / 2), top: hoverRegion.bottom });
    }, [hoverRegion]);
    useEffect(() => {
        setInitialPos(pos => {
            if (modalRegion.left < 0) {
                pos.left = 0;
            }
            if (modalRegion.right - (modalRegion.width / 2) > window.innerWidth) {
                pos.left = window.innerWidth - (modalRegion.width / 2) - 6;
            }
            return { ...pos };
        });
    }, [initialPos]);

    return <div ref={hoverRef} className={styles.root}>
        {children}
        <Modal visible={tooltipMounted}>
            <div className={styles.modal} ref={modalRef} style={{ ...initialPos }}>
                <div className={clsx(styles.popup, tooltipVisible && styles.visible)}>
                    {title}
                </div>
            </div>
        </Modal>
    </div>;
}
