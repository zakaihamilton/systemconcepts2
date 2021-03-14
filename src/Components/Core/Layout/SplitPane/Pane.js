import styles from "./Pane.module.scss"
import { joinClasses } from "@util/styles"
import SplitPane from "../SplitPane";

export default function Pane({ className, children, ...props }) {
    const { orientation } = SplitPane.Settings.useSettings();
    return <div className={joinClasses(styles, { root: true, [orientation]: true }, className)} {...props}>
        {children}
    </div>;
}
