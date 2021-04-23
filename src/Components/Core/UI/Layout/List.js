import styles from "./List.module.scss"
import { joinClasses } from "@util/styles"

export default function List({ className, children, handler }) {
    return <div className={joinClasses(styles, ["root"], className)}>
        {children}
    </div>;
}
