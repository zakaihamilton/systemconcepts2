import styles from "./Pane.module.scss"
import { joinClasses } from "@util/styles"
import SplitPane from "../SplitPane";
import { useRef } from "react";

export default function Pane({ classes, divider, children, size, style, ...props }) {
    const { orientation } = SplitPane.State.useState();
    const paneRef = useRef();
    const dividerRef = useRef();
    const list = SplitPane.List.useList(paneRef);
    const [dragging] = SplitPane.Drag.useDrag(dividerRef, paneRef, ({ orientation, percentage }) => {
        if (orientation === "vertical") {
            paneRef.current.style.flex = `0 0 ${percentage.x}%`;
        }
        else {
            paneRef.current.style.flex = `0 0 ${percentage.y}%`;
        }
    });
    const index = list.findIndex(ref => ref === paneRef.current);
    const isLast = index === list.length - 1;
    divider = divider && !isLast;

    style = { ...style };
    if (size) {
        style.flex = `0 0 ${size ? size : "auto"}`;
    }

    return <div ref={paneRef} className={joinClasses(styles, { root: true, [orientation]: true }, classes?.root)} style={style} {...props}>
        <div className={joinClasses(styles, { pane: true, [orientation]: true }, classes?.pane)}>
            {children}
        </div>
        <div ref={dividerRef} className={joinClasses(styles, { divider: true, visible: divider, [orientation]: true, dragging }, classes?.divider)} />
    </div>;
}
