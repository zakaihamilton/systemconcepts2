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
    const tooltipMounted = useTimer(250, 1000, hover || modalHover);
    const tooltipVisible = useTimer(500, 250, hover || modalHover);
    const tooltipValid = title && hoverRegion.left && hoverRegion.right;
    let [initialPos, setInitialPos] = useState({});
    useEffect(() => {
        let left = hoverRegion.left - hoverRegion.width;
        const top = hoverRegion.bottom - hoverRegion.height;
        if (left > window.innerWidth / 2) {
            const right = window.innerWidth - left - hoverRegion.width;
            setInitialPos({ right, top });
        }
        else {
            left = hoverRegion.right;
            setInitialPos({ left, top });
        }
    }, [hoverRegion]);

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
