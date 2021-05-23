import styles from "./Button.module.scss"
import { joinClasses } from "@util/styles"

export default function Button({ className, children, ...props }) {
    return <div className={joinClasses(styles, { root: true }, className)} {...props}>
        {children}
    </div>;
}
