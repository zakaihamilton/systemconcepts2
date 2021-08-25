import Table from "@components/Core/UI/Layout/Table"
import styles from "./Header.module.scss"
import { useMemo } from "react"
import Column from "./Header/Column"
import SearchButton from "./Header/Search/SearchButton"
import Search from "./Header/Search"

export default function TableHeader({ }) {
    const tableState = Table.State.useState();
    const columns = useMemo(() => (
        tableState?.columns?.filter(Boolean).map(column => (
            <Column key={column.id} {...column} />
        ))
    ), [tableState?.columns]);
    return <div className={styles.root}>
        <Search />
        <div className={styles.row}>
            {columns}
            <SearchButton />
        </div>
    </div>;
}
