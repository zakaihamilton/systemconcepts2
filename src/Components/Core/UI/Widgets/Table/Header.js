import Table from "@components/Core/UI/Layout/Table"
import styles from "./Header.module.scss"
import { useMemo } from "react"
import Item from "./Header/Item"

export default function TableHeader({ }) {
    const tableState = Table.State.useState();
    const items = useMemo(() => (
        tableState?.columns?.filter(Boolean).map(column => (
            <Item key={column.id} {...column} />
        ))
    ), [tableState?.columns]);
    return <div className={styles.root}>
        {items}
    </div>;
}
