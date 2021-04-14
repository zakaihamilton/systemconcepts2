import styles from "./Pane.module.scss"
import { joinClasses } from "@util/styles"
import SplitPane from "../SplitPane";
import { useRef } from "react";
import { useSize } from "./Pane/Size"

export default function Pane({ classes, divider, children, size, style, ...props }) {
    const { orientation } = SplitPane.State.useState();
    const paneRef = useRef();
    const dividerRef = useRef();
    const list = SplitPane.List.useList(paneRef);
    const [currentSize, dragging] = useSize({ dividerRef, paneRef, size });
    const index = list.findIndex(ref => ref === paneRef.current);
    const isLast = index === list.length - 1;
    divider = divider && !isLast;
    const dividerClassName = joinClasses(styles, { divider: true, visible: divider, [orientation]: true, dragging }, classes?.divider);

    style = { ...style };
    style.flex = currentSize;

    return <div ref={paneRef} className={joinClasses(styles, { root: true, [orientation]: true }, classes?.root)} style={style} {...props}>
        <div className={joinClasses(styles, { pane: true, [orientation]: true }, classes?.pane)}>
            {children}
        </div>
        <div ref={dividerRef} draggable={false} className={dividerClassName} />
    </div>;
}
