import styles from "./Pane.module.scss"
import { joinClasses } from "@util/styles"
import SplitPane from "../SplitPane";
import { useEffect, useRef, useState } from "react";

export default function Pane({ classes, divider, children, size, style, ...props }) {
    const { orientation } = SplitPane.State.useState();
    const [currentSize, setCurrentSize] = useState(size);
    const paneRef = useRef();
    const dividerRef = useRef();
    const list = SplitPane.List.useList(paneRef);
    const [dragging] = SplitPane.Resize.useDrag(dividerRef, paneRef, ({ orientation, percentage }) => {
        if (orientation === "vertical") {
            setCurrentSize(`0 0 ${percentage.x}%`);
        }
        else {
            setCurrentSize(`0 0 ${percentage.y}%`);
        }
    });
    const index = list.findIndex(ref => ref === paneRef.current);
    const isLast = index === list.length - 1;
    divider = divider && !isLast;

    useEffect(() => {
        setCurrentSize(`1 0 ${typeof size === "undefined" ? "auto" : size}`);
    }, [size]);

    style = { ...style };
    style.flex = currentSize;

    return <div ref={paneRef} className={joinClasses(styles, { root: true, [orientation]: true }, classes?.root)} style={style} {...props}>
        <div className={joinClasses(styles, { pane: true, [orientation]: true }, classes?.pane)}>
            {children}
        </div>
        <div ref={dividerRef} draggable={false} className={joinClasses(styles, { divider: true, visible: divider, [orientation]: true, dragging }, classes?.divider)} />
    </div>;
}
