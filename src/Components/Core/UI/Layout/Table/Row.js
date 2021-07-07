import styles from "./Row.module.scss"
import clsx from "clsx"
import Bar from "@components/Core/UI/Layout/Bar"

export default function Row({ selected, children, className, ...props }) {
    return <Bar className={clsx(styles.root, selected && styles.selected, className)} {...props}>
        {children}
    </Bar>
}
