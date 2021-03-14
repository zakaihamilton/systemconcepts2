import styles from "./Divider.module.scss"
import SplitPane from "../SplitPane"
import { joinClasses } from "@util/styles"

export default function Divider() {
    const { orientation } = SplitPane.Settings.useSettings();

    return <div className={joinClasses(styles, ["root", orientation])}>

    </div>;
}
