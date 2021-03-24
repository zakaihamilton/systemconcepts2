import styles from "./Pane.module.scss"
import { joinClasses } from "@util/styles"
import SplitPane from "../SplitPane";
import { useRef } from "react";

export default function Pane({ classes, divider, children, ...props }) {
    const { orientation } = SplitPane.State.useState();
    const paneRef = useRef();
    const dividerRef = useRef();
    SplitPane.List.useList(paneRef);
    const [dragging] = SplitPane.Drag.useDrag(dividerRef, paneRef, ({ orientation, percentage }) => {
        if (orientation === "vertical") {
            paneRef.current.style.flex = `0 0 ${percentage.x}%`;
        }
        else {
            paneRef.current.style.flex = `0 0 ${percentage.y}%`;
        }
    });

    return <div ref={paneRef} className={joinClasses(styles, { root: true, [orientation]: true }, classes?.root)} {...props}>
        <div className={joinClasses(styles, { pane: true, [orientation]: true }, classes?.pane)}>
            {children}
        </div>
        {!!divider && <div ref={dividerRef} className={joinClasses(styles, { divider: true, [orientation]: true, dragging }, classes?.divider)} />}
    </div>;
}
