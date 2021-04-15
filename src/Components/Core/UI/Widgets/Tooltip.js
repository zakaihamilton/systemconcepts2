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
    const tooltipVisible = useTimer(500, 250, hover || modalHover);
    const tooltipValid = title && hoverRegion.left && hoverRegion.right;
    let [initialPos, setInitialPos] = useState({});
    useEffect(() => {
        setInitialPos({ left: hoverRegion.left + (hoverRegion.width / 2), top: hoverRegion.bottom });
    }, [hoverRegion]);
    useEffect(() => {
        setInitialPos(pos => {
            if (modalRegion.left < 0) {
                pos = { ...pos };
                pos.left = 0;
            }
            if (modalRegion.right - (modalRegion.width / 2) > window.innerWidth) {
                pos = { ...pos };
                pos.left = window.innerWidth - (modalRegion.width / 2) - 6;
            }
            return pos;
        });
    }, [initialPos]);

    return <div ref={hoverRef} className={styles.root}>
        {children}
        <Modal visible={tooltipMounted && tooltipValid}>
            <div className={styles.modal} ref={modalRef} style={{ ...initialPos }}>
                <div className={clsx(styles.popup, tooltipVisible && styles.visible)}>
                    {title}
                </div>
            </div>
        </Modal>
    </div>;
}
