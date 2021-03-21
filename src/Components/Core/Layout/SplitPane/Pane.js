import styles from "./Pane.module.scss"
import { joinClasses } from "@util/styles"
import SplitPane from "../SplitPane";
import { useRef } from "react";

export default function Pane({ classes, divider, children, ...props }) {
    const { orientation } = SplitPane.State.useState();
    const ref = useRef();
    SplitPane.List.useList(ref);

    return <div className={joinClasses(styles, { root: true, [orientation]: true }, classes && classes.root)} {...props}>
        <div ref={ref} className={joinClasses(styles, { pane: true, [orientation]: true }, classes && classes.pane)}>
            {children}
        </div>
        {!!divider && <div className={joinClasses(styles, { divider: true, [orientation]: true }, classes && classes.divider)} />}
    </div>;
}
