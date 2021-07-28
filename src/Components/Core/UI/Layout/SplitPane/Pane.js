import styles from "./Pane.module.scss"
import { joinClasses } from "@util/styles"
import SplitPane from "../SplitPane";
import { useRef } from "react";
import { useSize } from "./Pane/Size"

export default function Pane({ classes, divider, last, children, size, minSize, maxSize, visible, style, ...props }) {
    const { orientation } = SplitPane.State.useState();
    const paneRef = useRef();
    const dividerRef = useRef();
    const [currentSize, dragging] = useSize({ dividerRef, paneRef, size, minSize, maxSize, last });
    const dividerClassName = joinClasses(styles, { divider: true, last, visible: divider, [orientation]: true, dragging }, classes?.divider);

    style = { ...style };
    style.flex = currentSize;

    if (!visible) {
        style.flex = "0 1 0em";
        style.display = "none";
    }

    return <div ref={paneRef} className={joinClasses(styles, { root: true, [orientation]: true }, classes?.root)} style={style} {...props}>
        {!!last && <div ref={dividerRef} draggable={false} className={dividerClassName} />}
        <div className={joinClasses(styles, { pane: true, [orientation]: true }, classes?.pane)}>
            {children}
        </div>
        {!last && <div ref={dividerRef} draggable={false} className={dividerClassName} />}
    </div>;
}
