import styles from "./Button.module.scss"
import { joinClasses } from "@util/styles"

export default function Button({ rootRef, className, selected, hover = true, visible = true, children, icon, iconSuffix, ...props }) {
    return <div ref={rootRef} className={joinClasses(styles, { root: true, visible, hover, selected }, className)} {...props}>
        {!!icon && <div className={joinClasses(styles, { icon: true, children })}>{icon}</div>}
        {children}
        {!!iconSuffix && <div className={styles.iconSuffix}>{iconSuffix}</div>}
    </div>;
}
