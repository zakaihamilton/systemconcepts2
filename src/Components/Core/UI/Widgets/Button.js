import styles from "./Button.module.scss"
import { joinClasses } from "@util/styles"

export default function Button({ rootRef, className, selected, hover = true, visible = true, children, icon, ...props }) {
    return <div ref={rootRef} className={joinClasses(styles, { root: true, visible, hover, selected }, className)} {...props}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {children}
    </div>;
}
