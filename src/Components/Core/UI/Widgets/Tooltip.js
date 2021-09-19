import { useEffect, useRef, useState } from "react";
import { useHover } from "@components/Core/Util/Hover"
import { useRegion } from "@components/Core/Util/Region"
import Modal from "@components/Core/Util/Modal"
import styles from "./Tooltip.module.scss"
import clsx from "clsx"

export default function Tooltip({ className, enabled = true, title, children }) {
    const hoverRef = useRef();
    const modalRef = useRef();
    const hover = useHover(hoverRef);
    const modalHover = useHover(modalRef);
    const hoverRegion = useRegion(hoverRef);
    const tooltipValid = title && hoverRegion.right;
    let [initialPos, setInitialPos] = useState({});
    useEffect(() => {
        let left = hoverRegion.left - hoverRegion.width;
        const top = hoverRegion.bottom - hoverRegion.height + 6;
        if (left > window.innerWidth / 2) {
            const right = window.innerWidth - left - hoverRegion.width + 6;
            setInitialPos({ right, top });
        }
        else if (hoverRegion.right) {
            left = hoverRegion.right + 6;
            setInitialPos({ left, top });
        }
    }, [hoverRegion]);

    const visible = tooltipValid && enabled && (hover || modalHover);

    return <div ref={hoverRef} className={clsx(styles.root, className)}>
        {children}
        <Modal visible={visible}>
            <div className={styles.modal} ref={modalRef} style={{ ...initialPos }}>
                <div className={clsx(styles.popup, visible && styles.visible)}>
                    {title}
                </div>
            </div>
        </Modal>
    </div>;
}
