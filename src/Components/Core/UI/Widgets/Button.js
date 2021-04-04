import styles from "./Button.module.scss"
import { joinClasses } from "@util/styles"

export default function Button({ classes, children, ...props }) {
    return <div className={joinClasses(styles, { root: true }, classes?.root)} {...props}>
        {children}
    </div>;
}
