import styles from "./Strip.module.scss"
import { joinClasses } from "@util/styles"

export default function Strip({ classes, children }) {
    return <div className={joinClasses(styles, ["root"], classes?.root)}>
        {children}
    </div>
}
