import styles from "./Button.module.scss"
import { joinClasses } from "@util/styles"

export default function Button({ className, hover = true, visible = true, children, ...props }) {
    return <div className={joinClasses(styles, { root: true, visible, hover }, className)} {...props}>
        {children}
    </div>;
}
