import styles from "./Strip.module.scss"
import { joinClasses } from "@util/styles"

export default function Strip({ className, children }) {
    return <div className={joinClasses(styles, ["root"], className)}>
        {children}
    </div>
}
