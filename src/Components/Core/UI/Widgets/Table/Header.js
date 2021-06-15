import Table from "@components/Core/UI/Layout/Table"
import styles from "./Header.module.scss"
import { useMemo } from "react"
import Column from "./Header/Column"

export default function TableHeader({ }) {
    const tableState = Table.State.useState();
    const columns = useMemo(() => (
        tableState?.columns?.filter(Boolean).map(column => (
            <Column key={column.id} {...column} />
        ))
    ), [tableState?.columns]);
    return <div className={styles.root}>
        {columns}
    </div>;
}
