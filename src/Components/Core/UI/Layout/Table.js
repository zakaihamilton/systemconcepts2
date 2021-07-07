import styles from "./Table.module.scss"
import { createState } from "@components/Core/Util/State";
import clsx from "clsx"
import Items from "./Table/Items"

export default function Table({ className, children, header }) {
    return <div className={clsx(styles.root, className)}>
        <div className={styles.header}>
            {header}
        </div>
        <div className={styles.table}>
            {children}
        </div>
    </div>
}

Table.State = createState();
Table.Items = Items;
