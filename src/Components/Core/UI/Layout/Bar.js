import styles from "./Bar.module.scss"
import clsx from "clsx"

export default function Bar({ className, children, ...props }) {
    return <div className={clsx(styles.root, className)} {...props}>
        {children}
    </div>;
}
